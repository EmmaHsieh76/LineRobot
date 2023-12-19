import 'dotenv/config'
import linebot from 'linebot'
import near from './commands/near.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (event.message.type === 'location') {
    near(event)
  } else if (event.message.type === 'text') {
    event.reply(event.message.text)
  }
})

bot.on('message', (event) => {})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
