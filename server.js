const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {PORT,mongoUri} = require('./config')
const path = require('path')
// (cors) for Ajax request
const cors = require('cors')
// (morgan) logs every request to console
const morgan = require('morgan')

const BucketListItem = require('./models/bucketlistItem')
const BucketListItemRoutes = require('./routes/api/bucketListItems')

//BucketListItemRoutes = require('./route/bucketListItems')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())


//connect to database
mongoose.connect(mongoUri,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
    //using promises because is asyc
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err.message) )

//const PORT = 3000

app.use('/api/bucketList',BucketListItemRoutes)


// Set deployment 
if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/dist'))
    app.get('*',(req,res) => {
        res.sendfile(path.resolve(__dirname,'client','dist','index.html'))
    })
}



app.listen(PORT,() => {console.log("server started at Port " + PORT)})