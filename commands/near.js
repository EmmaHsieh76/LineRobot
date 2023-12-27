import axios from 'axios'
import * as cheerio from 'cheerio'
import { distance } from '../utils/distance.js'
// import nearTemplates from '../templates/near.js'
import fs from 'node:fs'

export default async (event) => {
  try {
    const match = event.message.address.match(/(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))/)

    const { data } = await axios.get(`https://ifoodie.tw/explore/${match[1].replace('台灣', '')}/${match[2]}/list`)
    const $ = cheerio.load(data)
    // const replies = []
    const json = JSON.parse($('#__NEXT_DATA__').text())
    // console.log('json', json)
    // console.log(`https://ifoodie.tw/explore/${match[1]}/${match[2]}/list`)
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
        return restaurant.distance < 2
      })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 2)
      
      // console.log('json',restaurants)
      fs.writeFileSync('./aaa.json', JSON.stringify(json, null, 2))
      
    // for (let i = 0; i < 5; i++) {
    //   // 餐廳名稱
    //   const title = restaurants[i].name
    //   let image = restaurants[i].primaryCheckin.photos[0]
    //   // 圖片
    //   if (image !== undefined) {
    //     image = restaurants[i].primaryCheckin.photos[0]
    //   } else {
    //     image = 'https://www.twfood.cc/img/code/IW472/_.jpg'
    //   }
    //   const imageurl = new URL(image, 'https://lh3.googleusercontent.com/').href
    //   const score = restaurants[i].rating.toString()
    //   const totalStar = Math.round(parseFloat(score))
    //   const address = restaurants[i].address.toString()
    //   const openTime = restaurants[i].openingHours.toString()
    //   const phone = 'tel:' + restaurants[i].phone
    //   // 產生新模板
    //   const template = nearTemplates()
    //   // 修改模板標題
    //   template.body.contents[0].text = title
    //   // 修改模板圖片
    //   template.hero.url = imageurl
    //   // 分數星星
    //   for (let j = 0; j < totalStar; j++) {
    //     template.body.contents[1].contents[j].url =
    //       'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
    //   }
    //   for (let j = totalStar; j < 5; j++) {
    //     template.body.contents[1].contents[j].url =
    //       'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    //   }

    //   template.body.contents[1].contents[5].text = score
    //   template.body.contents[2].contents[0].contents[1].text = address
    //   template.body.contents[2].contents[1].contents[1].text = openTime
    //   template.footer.contents[0].action.uri = phone
    //   // 加入陣列中
    //   replies.push(template)
    //   console.log('餐廳名稱', title)
    //   console.log('圖片', imageurl)
    //   console.log('分數', score)
    //   console.log('總分', totalStar)
    //   console.log('地址', address)
    //   console.log('開放時間', openTime)

    //   fs.writeFileSync('./dump/near.json', JSON.stringify(template, null, 2))
    // }

    // const result = await event.reply({
    //   type: 'flex',
    //   altText: '美食餐廳',
    //   contents: {
    //     type: 'carousel',
    //     contents: replies
    //   }
    // })
    // console.log(result)
  } catch (error) {
    console.log(error)
  }
}
