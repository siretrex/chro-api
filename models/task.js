const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
        trim: true
    },
    total_minutes:{
        type: Number,
        default:0
    },
    actions:{
        type:[],
        default:[]
    }
},{
    timestamps:true
});

module.exports = mongoose.model('task', taskSchema);