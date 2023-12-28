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
            label: '宵夜',
            data: `宵夜,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '小吃',
            data: `小吃,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '火鍋',
            data: `火鍋,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '牛排',
            data: `牛排,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '日式料理',
            data: `日式料理,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '咖啡',
            data: `咖啡,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '甜點',
            data: `甜點,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '酒吧',
            data: `酒吧,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '早午餐',
            data: `早午餐,${event.message.latitude},${event.message.longitude},${event.message.address}`
          }
        }
      ]
    }
  })
}
