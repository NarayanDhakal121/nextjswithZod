
import {resend} from '@/lib/resend'

import VerificationEmail from '../../emails/verificationEmail';
import { ApiResponse } from '@/types/ApiResponse';


export async function sendVerificationEmail(
    email:string,
    username:string,
    otp:string
): Promise<ApiResponse>{

    try {

        await resend.emails.send({
            from: 'you@example.com',
            to: 'email',
            subject: 'Mystry message | Verificatiom code',
            react: VerificationEmail({username, otp}),
          });


        return {suscess: true, message: 'suscessful verification email'}
        
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {suscess: false, message: 'failed to send verification email'}
        
    }

}
