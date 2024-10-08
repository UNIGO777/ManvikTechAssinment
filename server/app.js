const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000

const user = require("./routers/authRouter")
const cart = require("./routers/cartRoutes") // Import the cart routes

mongoose.connect("mongodb://localhost:27017/task-naman")
  .then(() =>  ('Database connected'))
  .catch((err) => {
    console.error("Error connecting to database:", err)
  })

const categories = require("./routers/categoryRoutes")
const product = require("./routers/productRouter")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.get('/', (req, res) => {
  res.send("Welcome to the API")
})

app.use('/api/user', user)
app.use('/api/categories', categories)
app.use('/api/products', product)
app.use('/api/cart', cart) // Add cart route

app.listen(port, (err) => {
  if (err) console.error("Error starting server:", err)
  else  (`Server running on port ${port}`)
})