import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
const port = 80
app.use(cors())
app.use(express.static('../dist'));

const notifications = [];

const textParser = bodyParser.text();


app.post('/', textParser, (req, res) => {
  console.info("you posted", req.body)
  notifications.unshift({
    date: new Date(),
    message: req.body
  })
})

app.get('/notifications', (req, res) => {
  res.send(JSON.stringify(notifications, null, 4));
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
