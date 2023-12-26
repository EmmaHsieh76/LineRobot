// import * as cheerio from 'cheerio'
import json from '../aaa.json' assert { type: 'json' }
import template2 from '../templates/near.js'
import fs from 'node:fs'
export default async (event, input) => {
  try {
    // const $ = cheerio.load(data)
    console.log(input, 'input')
    console.log(event, 'event')

    const name = []
    const imgUrl = []
    const indexes = []
    const restaurants = json.props.initialState.search.explore.data
    const templates = [] // 5個flex message

    for (let i = 0; i < restaurants.length; i++) {
      if (
        restaurants[i].categories.some((item) => item.includes(input)) &&
        restaurants[i].primaryCheckin.photos.length !== 0
      ) {
        name.push(restaurants[i].name)
        imgUrl.push(restaurants[i].primaryCheckin.photos[0])
        indexes.push(i)
      }
    }
    console.log(name)
    console.log(indexes)

    for (let i = 0; i < 5; i++) {
      // 建立新模板
      const template = template2()
      const img = imgUrl[i]
      const title = name[i]
      template.hero.url = img
      template.body.contents[0].text = title
      templates.push(template)
      console.log(title)
      console.log(img)
      fs.writeFileSync('./dump/near2.json', JSON.stringify(template, null, 2))
      // console.log(template)
    }
    console.log('result之前')

    const result = await event.reply({
      type: 'flex',
      altText: '搜尋結果',
      contents: {
        type: 'carousel',
        contents: templates
      }
    })
    console.log('result前')

    console.log(result, 'result')
    console.log('result後')
  } catch (error) {
    console.log(error)
  }
}
