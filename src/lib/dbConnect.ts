

import mongoose from "mongoose";


type connectionObject = {
    isConnected?: number;
}

const connection: connectionObject = {}

async function connectDb(): Promise<void>{
if (!connection.isConnected){
    console.log("Already cnnected to the database");
    // if our work done return here **safety check**
    // database connection is already connected so no need for try catch
    return 
}
//in case  if not connected

try {

   const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

   connection.isConnected = db.connections[0].readyState 
  
    
 console.log("DB connection established")

} catch (error) {

    console.log("Database connection error", error)


    process.exit(1)
    
}

}

export default connectDb;