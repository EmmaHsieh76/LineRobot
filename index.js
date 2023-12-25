import 'dotenv/config'
import linebot from 'linebot'
import near from './commands/near.js'
import category from './commands/category.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (event.message.type === 'location') {
    near(event)
  }
  if (event.message.text === '小吃' || '下午茶' || '午餐') {
    const input = event.message.text
    category(event, input)
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
