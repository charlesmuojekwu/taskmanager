const {Schema,model} = require('mongoose')

const bucketListSchema = new Schema({
    description : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now,
    }
})

const BucketListItem = model('bucket',bucketListSchema)
module.exports = BucketListItem

