const foodModel = require('../models/foodModel')
const fs = require('fs')
const fspromises = require('fs').promises
const path = require('path')

 const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`

    try{
        await foodModel.create({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename
        })
        res.status(201).json({'message':'✅ Food item added successfully!'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({'message':'⚠️ Failed to add item. Please try again.'})
    }
        
 }

 const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find()
        res.json({data:foods})

    }
    catch(error){
        console.log(error)
        res.status(500).json({"message":'Error Listing Food'})
    }
 }

 const removeFood = async (req,res)=>{
    try{
        const {id} = req.query
        console.log(id);
        const food = await foodModel.findById(id)
        if(!food)
            return res.status(404).json({'message':'Food not found'})
        
        await fspromises.unlink(path.join(__dirname,'..','uploads',`${food.image}`))
        await foodModel.deleteOne({_id:id})
        res.status(200).json({'message':"✅ Removed successfully!"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({'error':"⚠️ Failed to remove item. Please try again."})
    }
 }

 module.exports = {addFood,listFood,removeFood}