import json from '../aaa.json' assert { type: 'json' }
import template2 from '../templates/near.js'
import fs from 'node:fs'

export default async (event, input) => {
  try {
    const name = []
    const imgUrl = []
    // const indexes = []
    const restaurants = json.props.initialState.search.explore.data
    const templates = [] // 5個flex message

    for (let i = 0; i < restaurants.length; i++) {
      if (
        restaurants[i].categories.some((item) => item.includes(input)) &&
        restaurants[i].primaryCheckin.photos.length !== 0
      ) {
        name.push(restaurants[i].name)
        imgUrl.push(restaurants[i].primaryCheckin.photos[0])
        // indexes.push(i)
      }
    }

    for (let i = 0; i < 5; i++) {
      const template = template2() // 建立新模板
      template.body.contents[0].text = name[i] //標題

      template.hero.url = imgUrl[i] // 圖片

      template.body.contents[1].contents[5].text = restaurants[i].rating.toString() //分數

      template.body.contents[2].contents[0].contents[1].text = restaurants[i].address.toString() //地址

      template.body.contents[2].contents[1].contents[1].text = restaurants[i].openingHours.toString() //營業時間

      const phone = 'tel:' + restaurants[i].phone
      template.footer.contents[0].action.uri = phone //電話

      //星星
      const score = restaurants[i].rating.toString()
      const totalStar = Math.round(parseFloat(score))
      for (let j = 0; j < totalStar; j++) {
        template.body.contents[1].contents[j].url =
          'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
      }
      for (let j = totalStar; j < 5; j++) {
        template.body.contents[1].contents[j].url =
          'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
      }

      templates.push(template)
      fs.writeFileSync('./dump/near5.json', JSON.stringify(template, null, 2))
    }
    fs.writeFileSync('./dump/near6.json', JSON.stringify(templates, null, 2))

    await event.reply({
      type: 'flex',
      altText: '搜尋結果',
      contents: {
        type: 'carousel',
        contents: templates
      }
    })
  } catch (error) {
    console.log(error)
  }
}
