const axios = require('axios').default;
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors({origin: '*'}))


app.all('/check', async(req, res) => {
    const red = await axios.get('https://api.brick-hill.com/v1/user/profile?id=3', {
        validateStatus: () => true
    })

    res.send(JSON.stringify({
        isOnline: red.status == 200,
        statusCode: red.status,
        statusText: red.statusText,
    }))
})
app.listen(process.env.PORT || 3000)