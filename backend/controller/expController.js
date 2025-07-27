const expModel = require('../model/expModel');

const addExp = async (req,res) => {
    try {
        const {imageUrl,title ,amount, category} = req.body;
        const data = new expModel({
            imageUrl,title,amount,category
        })
        const result = await data.save();
        res.status(200).json(data,{message:"Expenses Added"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const getAllExp = async (req,res) => {
    try {
        const data = await expModel.find();
        if (data != null) {
            res.status(200).json(data)
        } else {
            res.status(204).json({message:"No data Found"});
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getExp = async (req,res) => {
    try {
        const data = await expModel.findById(req.params.id);
        if (data != null) {
            res.status(200).json(data);
        } else {
            res.json({message:"Not found"})
        }
    } catch (error) {
        res.json({message:error.message})
    }
}

const updateExp = async (req,res) => {
    try {
        const data = await expModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json(data,{message:"Data Updated"});
    } catch (error) {
        res.json({message:error.message})
    }
}

const deleteExp = async (req,res) => {
    try {
        const data = await expModel.findByIdAndDelete(req.params.id);
        res.status(200).json(data,{message:"Data Deleted"});
    } catch (error) {
        res.json({message:error.message})
    }
}

module.exports = { addExp, getAllExp, getExp, updateExp, deleteExp };