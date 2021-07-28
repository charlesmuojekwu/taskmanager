const { Router } = require('express')
const BucketList= require('../../models/bucketlistItem')

const router = Router()

router.get('/', async (req,res) => {

    
    try{
        const bucketListItems = await BucketList.find()
        if(!bucketListItems) throw new Error('No bucketlistItems')
        const sorted = bucketListItems.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    }catch(err){
        res.status(500).json({message:error.message})
    }

    
})


router.post('/', async (req,res) => {
    const newBucketList = new BucketList(req.body)
    try{
        const bucketlistItem = await newBucketList.save()
        if(!bucketlistItem) throw new Error('something went wrong saving item')
        res.status(200).json(bucketlistItem)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})


router.put('/:id', async (req,res) => {
    const {id} = req.params
    try{
        const response = await BucketList.findByIdAndUpdate(id,req.body)
        if(!response) throw new Error('Something went wrong')
        const updated = { ...response._doc, ...req.body}
        res.status(200).json(updated)
    }catch(err){
        res.status(500).json({ message:error.message})

    }
})


router.delete('/:id', async (req,res) => {
    const {id} = req.params

    await BucketList.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).json(result)
            console.log(result)
        })
        .catch((err) => {
            res.status(500).json({ message:err.message})
            console.log(err.message)
        })

    // try{
    //     const removed= await BucketList.findByIdAndDelete(id)
    //     if(!removed) throw new Error('Something went wrong')
    //     res.status(200).json(removed)
    // }catch(error){
    //     res.status(500).json({ message:error.message})
    //     console.log(error)

    // }
})


module.exports = router