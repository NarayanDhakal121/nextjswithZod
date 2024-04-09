
import {z} from 'zod'; 


// username validation
export const usernameValidation = z
.string()
.min(2, "username must be at least 2 characters")
.max(20, "username must be more than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/, "Username must contain special characters") 


// other field validation such as username, password, email and custom
export const signUpSchema = z.object({
    username: usernameValidation,
     email:z.string().email({message:'Invalid email address'}),
     password: z.string().min( 6, {message:'password must be of 6 characters'}),

})