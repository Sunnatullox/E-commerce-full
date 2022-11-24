import mongoose from "mongoose";


const connectDatabase = async() =>{
    try {
       const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connect successfuly") 
          
    } catch (error) {
        console.log(`Error ${error.message}`)
        process.exit(1)
    }
}

export default connectDatabase;