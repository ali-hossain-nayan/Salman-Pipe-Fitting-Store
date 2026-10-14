import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
// db->model->controller->routess
// app config
const app = express()
const port = process.env.PORT || 4000


// middleware
app.use(express.json())//connectivity with json form mate fornt-backend
app.use(cors())//access frontend from any server

// DB Connection
connectDB();



// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);





app.get('/', (req, res) => {
    res.send('API is Working...')
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
// mongodb+srv://aliNayan:01690205129@cluster0.rzcnd.mongodb.net/?
