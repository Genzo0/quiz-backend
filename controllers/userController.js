const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message : "No User Found"})
    }
    res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, picture_url } = req.body

    //confirm data
    if(!username || !password){
        return res.status(400).json({message : "Username and password required"})
    }

    //check duplicate 
    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate){
        return res.status(400).json({message : `${username} username has been used, pick another username!`})
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = {username, "password":hashedPwd, picture_url}

    //save and store user
    const user = await User.create(userObject)

    if(user){
        res.status(201).json({message : `New User ${username} created`})
    } else {
        res.status(400).json({message : "Invalid data received"})
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, picture_url } = req.body

    //confirm data 
    if(!id || !username || !picture_url){
        return res.status(400).json({message : "Id, username, and picture url are required"})
    }

    //check user exists
    const user = await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message : "User not found"})
    }

    //check duplicate
    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(400).json({message : "Duplicate username, pick another username"})
    }

    user.username = username
    user.picture_url = picture_url

    if(password){
        const hashedPwd = await bcrypt.hash(password, 10)
        user.password = hashedPwd
    }

    const updatedUser = await user.save()

    res.json({message : `${updatedUser.username} updated`})
})

module.exports = { getAllUsers, createNewUser, updateUser }