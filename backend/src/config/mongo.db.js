import mongoose from "mongoose"

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            
        });
        console.log("🎉 Database is connected successfully");
    } catch (error) {
        console.log("ERR❌ :",error);
    }
}

export default connectToDB;