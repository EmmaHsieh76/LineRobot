export default async (event) => {
  await event.reply({
    type: 'text',
    text: '想吃什麼食物種類呢?',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            label: '早餐',
            text: '早餐'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '午餐',
            text: '午餐'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '下午茶',
            text: '下午茶'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '晚餐',
            text: '晚餐'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '小吃',
            text: '小吃'
          }
        }
      ]
    }
  })
}
