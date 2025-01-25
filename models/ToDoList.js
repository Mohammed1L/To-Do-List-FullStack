const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const toDoSchema = Schema({
    title: {type:String , required:true},
    description:{type:String , required:true},
    isCompleted:{type:String,required:true},
    completedOn: String,
    createdBy:{
        ref:"User",
        type: Schema.ObjectId
    }
},{
    timestamps:true
});

const ToDo = mongoose.model("ToDo",toDoSchema);

module.exports = ToDo;