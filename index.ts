import * as dotenv from 'dotenv'
dotenv.config()
import app from './src/server'
const PORT = 3000;
app.listen(PORT, () => {
    console.log('app is running on port 3000');
})