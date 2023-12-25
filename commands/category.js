import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'node:fs'
import template2 from '../templates/near.js'

export default async (event, input) => {
  try {
    const match = event.message.address.match(/(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))/)

    const { data } = await axios.get(`https://ifoodie.tw/explore/${match[1].replace('台灣', '')}/${match[2]}/list`)

    const $ = cheerio.load(data)

    const json = JSON.parse($('#__NEXT_DATA__').text())

    fs.writeFileSync('./bbb.json', JSON.stringify(json, null, 2))

    const name = []
    const imgUrl = []
    const indexes = []
    const restaurants = json.props.initialState.search.explore.data
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].categories.includes(input) && restaurants[i].primaryCheckin.photos.length !== 0) {
        name.push(restaurants[i].name)
        imgUrl.push(restaurants[i].primaryCheckin.photos[0])
        indexes.push(i)
      }
    }
    console.log(name)
    console.log(indexes)
    const templates = [] // 5個flex message

    for (let i = 0; i < 5; i++) {
      const template = template2()
      template.hero.url = imgUrl[i]
      template.body.contents[0].text = name[i]
      templates.push(template)
    }
    await event.reply({
      type: 'flex',
      altText: `${input}搜尋結果`,
      contents: {
        type: 'carousel',
        contents: templates
      }
    })
  } catch (error) {
    console.log(error)
  }
}
