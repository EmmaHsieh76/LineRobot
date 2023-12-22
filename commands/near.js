import axios from 'axios'
import * as cheerio from 'cheerio'
import { distance } from '../utils/distance.js'
import nearTemplates from '../templates/near.js'
import fs from 'node:fs'

export default async (event) => {
  // event.message.address = 108台北市信義區
  // match = [
  //   '台北市信義區',
  //   '台北市',
  //   '信義區',
  //   '區',
  //   index: 3,
  //   input: '108台北市信義區',
  //   groups: [Object: null prototype] { city: '台北市', district: '信義區' }
  // ]
  try {
    const match = event.message.address.match(/(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))/)

    const { data } = await axios.get(`https://ifoodie.tw/explore/${match[1].replace('台灣', '')}/${match[2]}/list`)
    const $ = cheerio.load(data)
    const replies = []
    const json = JSON.parse($('#__NEXT_DATA__').text())
    console.log('json', json)
    fs.writeFileSync('./aaa.json', JSON.stringify(json, null, 2))
    console.log(`https://ifoodie.tw/explore/${match[1]}/${match[2]}/list`)
    const restaurants = json.props.initialState.search.explore.data
      .map((restaurant) => {
        restaurant.distance = distance(
          event.message.latitude,
          event.message.longitude,
          restaurant.lat,
          restaurant.lng,
          'K'
        )
        return restaurant
      })
      .filter((restaurant) => {
        return restaurant.distance < 5
      })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 5)

    console.log('restaurants', restaurants)

    // 模板引入
    const template = nearTemplates()
    for (let i = 0; i < 5; i++) {
      // 餐廳名稱
      template.body.contents[0].text = restaurants[i].name

      // 圖片
      const image = restaurants[i].primaryCheckin.photos[0]
      const imageurl = new URL(image, 'https://lh3.googleusercontent.com/').href

      template.hero.url = restaurants[i].primaryCheckin.photos[0]
      replies.push(template)
      console.log('餐廳名稱', restaurants[i].name)
      console.log('圖片', imageurl)
    }

    fs.writeFileSync('./dump/near2.json', JSON.stringify(template, null, 2))
    const result = await event.reply({
      type: 'flex',
      altText: '查詢結果',
      contents: {
        type: 'carousel',
        contents: replies
      }
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
