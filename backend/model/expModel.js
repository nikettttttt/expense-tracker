const mongoose = require('mongoose');

const expSchema = new mongoose.Schema({
    imageUrl:String,
    title : String,
    amount: Number,
    category : String
},{
    timestamps:true
})

const expModel = mongoose.model("Expenses",expSchema);

module.exports = expModel;