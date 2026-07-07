const mongoose = require("mongoose");


async function conectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("✅  Date basa conct successfulliy");

    }catch(err){
        console.log("Data Base not conected",err);

    }
    
}
module.exports = conectDB;