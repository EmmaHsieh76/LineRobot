import axios from 'axios'
import cheerio from 'cheerio'
import { distance } from './utils/distance.js'

const main = async () => {
  const { data } = await axios.get(
    'https://ifoodie.tw/explore/%E6%96%B0%E5%8C%97%E5%B8%82/%E6%B3%B0%E5%B1%B1%E5%8D%80/list'
  )
  const $ = cheerio.load(data)
  const json = JSON.parse($('#__NEXT_DATA__').text())
  const restaurants = json.props.initialState.search.explore.data
  restaurants.map((restaurant) => {
    restaurant.distance = distance(25.034865, 121.4303618, restaurant.lat, restaurant.lng, 'K')
    return restaurant
  })
  console.log(restaurants)
}

// main()

const text = '108台北市信義區'
const aaa = text.match(/(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))/)
console.log(aaa)
