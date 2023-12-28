import 'dotenv/config'
import linebot from 'linebot'
import near from './commands/near.js'
import category from './commands/category.js'
import quickReply from './commands/quickReply.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (event.message.type === 'location') {
    console.log('location收到')
    quickReply(event)
  }
})

bot.on('postback', (event) => {
  near(event)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
