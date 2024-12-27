import app from "./app.js";
import {connectToDatabase }from "./db/connection.js";


//conntections and listeners
const PORT =process.env.PORT || 5000;
connectToDatabase()
  .then(()=>{
    app.listen(PORT,()=>console.log("server started"));
  })
  .catch((err)=>console.log(err));