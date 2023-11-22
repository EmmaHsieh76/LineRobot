import axios from 'axios'
import * as cheerio from 'cheerio'

export default async (event) => {
  try {
    const { data } = await axios.get('https://guide.michelin.com/tw/zh_TW/restaurants/bib-gourmand')

    const $ = cheerio.load(data)
    const replies = []
    $('.card_menu-image').each(function () {
      replies.push($(this).text().trim())
    })
  } catch (error) {
    console.log(error)
  }
}
