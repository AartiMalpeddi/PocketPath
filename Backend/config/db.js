const mongoose=require('mongoose')
const connectDB=async()=>{
    mongoose.connect('mongodb://127.0.0.1/expense-tracker').then(()=>console.log("Connection is SucessFull!"))
.catch(err=>console.log("Error ",err))
}
module.exports=connectDB