import mongoose from 'mongoose';


export const connectdb=async ()=>{
try{
    const connection=await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected`);
}catch(error){
    console.log(`Error: ${error.message}`);
    process.exit(1);
}
};//changes to be made