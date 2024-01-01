import { createUser, signin} from './handlers/user'
import { protect } from './modules/auth'
import router from './router'
import express from 'express'



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req , res) => {
    res.status(200)
    res.send('<h1>hello from express</h1>')
})

app.use('/api',protect,router)


app.post('/user',createUser)
app.post('/signin',signin)

export default app