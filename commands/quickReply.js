export default async (event) => {
  await event.reply({
    type: 'text',
    text: '想吃什麼食物種類呢?',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '早餐',
            data: `早餐,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '午餐',
            data: `午餐,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '下午茶',
            data: `下午茶,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '晚餐',
            data: `晚餐,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '小吃',
            data: `小吃,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        }
      ]
    }
  })
}
