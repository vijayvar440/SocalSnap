require("dotenv").config();

const app = require("./src/app");
const conectDB = require("./src/db/db");

conectDB();

app.listen(3000, ()=>{
    console.log(" Server is runnig port 3000 ✅ ")

})