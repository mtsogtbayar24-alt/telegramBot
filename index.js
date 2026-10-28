const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const BOT_TOKEN = process.env.BOT_TOKEN
const PORT = process.env.PORT || 3000

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required")
}

app.post("/new-message", async (req, res) => {
  const { message } = req.body

  if (
    !message ||
    typeof message.text !== "string" ||
    !message.chat ||
    message.chat.id === undefined
  ) {
    return res.sendStatus(200)
  }

  if (!message.text.toLowerCase().includes("marco")) {
    return res.sendStatus(200)
  }

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: message.chat.id,
      text: "Polo!!",
    })
    console.log("Message posted")
    return res.sendStatus(200)
  } catch (error) {
    console.error("Failed to send Telegram message:", error.message)
    return res.sendStatus(502)
  }
})

app.listen(PORT, () => {
  console.log(`Telegram app listening on port ${PORT}!`)
})
