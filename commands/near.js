import axios from 'axios'
import cheerio from 'cheerio'
import { distance } from '../utils/distance.js'

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
  const match = event.message.address.match(/(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))/)

  const { data } = await axios.get(`https://ifoodie.tw/explore/${match[1]}/${match[2]}/list`)
  const $ = cheerio.load(data)
  const json = JSON.parse($('#__NEXT_DATA__').text())
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

  console.log(restaurants)
}
