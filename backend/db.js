const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sampleData', (err) =>{
    if(!err){
        console.log("Connection successfull");
    } else{
        console.log(" Error in Connection", err);
    }
})

module.exports = mongoose;