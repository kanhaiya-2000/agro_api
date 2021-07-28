const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    users:[{
        type:String,        
    }],
    marketID:{
        type:String,
        required:true,
    },
    marketName:{
        type:String,        
    },
    cmdtyID:{
        type:String,
        required:true,
    },
    marketType:{
        type:String
    },
    cmdtyName:{
        type:String
    },
    priceUnit:{
        type:String,
        required:true
    },    
    prices:[{
        type:Number,        
    }],
    meanprice:{
        type:Number,
        default:0
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("Report", ReportSchema);