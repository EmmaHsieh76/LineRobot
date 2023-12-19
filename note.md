# 目前想法

分類麵食、小吃、...
顯示使用者位置
出現距離附近的餐廳
點擊想要的餐廳後，顯示當前是否公休 
or 使用者打日期跟時間，是否能訂位
隨機出現一種料理


# line 機器人

1.npm init --yes (初始化 package.json) 2.在 node.js 使用 ECMA 語法要在 package.json 裡加入 "type":"module",
3.npm i -D eslint nodemon
4.npm i linebot dotenv
5.npx eslint --init =>初始化 eslint 
6.建立.env => line 的帳號密碼機密資訊 
7.建立.gitignore 放入 .env node_modules
8.package.json =>使用 ecma 語法 => "type": "module",
9.把"scripts": {
  //改成下面這行
    "dev": "nodemon index.js"
  },
當終端機打 npm run dev 會執行 nodemon index.js 的檔案
 
10.終端機打 npm run dev
