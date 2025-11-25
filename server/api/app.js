const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();


app.post('/', (req,res) => {
    // res.send('hello bro')
    console.log(req.body.question)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function main() {
  // Pick the model you want to use
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",   // or another available model
  });

  const result = await model.generateContent(
    req.body.question
  );

  console.log(result.response.text());
  res.status(200).json({
    response:result.response.text()
  })
}

main().catch(err => {
  console.error("Error from Gemini API:", err);
});
})

app.use((req, res) => {
  res.status(404).json({ msg: "Not Found" });
});
module.exports = app