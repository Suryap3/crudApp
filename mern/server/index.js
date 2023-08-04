const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')

const port = 5000

const connectDB = async () => {

    try {

      await mongoose.connect('mongodb://localhost:27017/items')
  
      console.log('MongoDB Connected')

    } catch (error) {

      console.log(error)

      process.exit(1)

    }
}

const Item = mongoose.model('Item', 

    mongoose.Schema({

        name: {
            type: String,
            required: [true, 'Please enter a name']
        },
        description: {
            type: String,
            required: [true, 'Please enter a description']
        }

    })

)

connectDB()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.get('/', async (req, res) => {

    try{

        const items = await Item.find({ })
  
        res.status(200).json(items)

    }catch{

        res.status(400).json({ Message: "Server Error" })

    }
  
})

app.post('/', async (req, res) => {

    try{

        const { name, description} = req.body

        if(!name || !description){

            res.status(400).json({ Message: "Enter name and description" })

            return
        }

        const item = await Item.create({ 

            name: req.body.name,
            description: req.body.description

        })
    
        res.status(200).json(item)

    }catch{

        res.status(400).json({ Message: "Server Error" })

    }
  
})

app.put('/:id', async (req, res) => {

    try{

        const item = await Item.findById(req.params.id)

        const { name, description} = req.body

        if(!item){

        res.status(400).json({ Message: "Item not found" })

        return

        }

        if(!name || !description){

            res.status(400).json({ Message: "Enter name and description" })

            return
        }

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
        })
    
        res.status(200).json(updatedItem)

    }catch{

        res.status(400).json({ Message: "Server Error" })

    }
  
})

app.delete('/:id', async (req, res) => {

    try{

        const item = await Item.findById(req.params.id)

        if(!item){
    
            res.status(400).json({ Message: "Item not found" })
    
            return
        }
        
        await Item.deleteOne({_id: req.params.id})
      
        res.status(200).json({ id: req.params.id})

    }catch{

        res.status(400).json({ Message: "Server Error" })

    }
  
})

app.use((req, res, next) => {

    res.status(404).json({ Message: 'Invalid API Endpoint'})

})

app.listen(port, () => console.log('Server started'))