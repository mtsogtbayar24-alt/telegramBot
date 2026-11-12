require("dotenv").config()
const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const BOT_TOKEN = process.env.BOT_TOKEN
const CHAT_ID = process.env.CHAT_ID
const PORT = process.env.PORT || 3000

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required")
}
if (!CHAT_ID) {
  throw new Error("CHAT_ID environment variable is required")
}

app.post("/new-order", async (req, res) => {
  const {name, phone}= req.body

 if (typeof name !== "string" || name.trim() === "" ||
    typeof phone !== "string" || phone.trim() === "") {
  return res.sendStatus(400)
}
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id : CHAT_ID,
      text: name + " " + phone 
    })
    console.log("Захиалгыг хүлээн авлаа.")
    return res.sendStatus(200)
  } catch (error) {
    console.error("Захиалга дамжуулахад алдаа гарлаа. :", error.message)
    return res.sendStatus(502)
  }
})

app.listen(PORT, () => {
  console.log(`Telegram app listening on port ${PORT}!`)
})
