import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect(process.env.mongo_URI,{dbName:"gofood"})
    .then(async()=>{
        console.log("connect to MongoDB");
        
        const fetched_data = await mongoose.connection.db.collection("fooditems");
        global.fooditems = await fetched_data.find({}).toArray();

        const fetch_data = await mongoose.connection.db.collection("foodcategory");
        global.foodcategory = await fetch_data.find({}).toArray();
    }).catch((e)=>{
        console.log(e);
    })
}