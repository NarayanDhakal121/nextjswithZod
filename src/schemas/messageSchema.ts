import { Message } from './../models/User';
import {z} from 'zod'

export const MessageSchema = z.object({

content: z
.string()
.min(10, {message:'content must be of at least 10 characters'})
.max(300, {message:'content must be no longer than 300 characters'})
})