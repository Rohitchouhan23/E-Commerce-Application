import mongoose from "mongoose";
export const ConnectDB =async(mongoUri)=>{
try {
    const conn=await mongoose.connect(mongoUri) 
    console.log(`MongoDB connected:${conn.connection.host} 🔗`);
} catch (error) {
    console.log(`MongoDB connected error:${error.message}`);
    process.exit(1)
}
}