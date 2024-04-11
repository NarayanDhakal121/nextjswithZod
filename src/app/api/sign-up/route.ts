
import connectDb from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";



export async function POST(request: Request){
    await connectDb()

    try {
  
     const{username, email, password}  = await request.json()
        
    } catch (error) {
        console.error('Error registering user')
        return Response.json({
            suscess:false,
            message:"Error registering user"
        },{status:500})
        
    }
}
