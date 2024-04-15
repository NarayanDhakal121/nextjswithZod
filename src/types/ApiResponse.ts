import { Message } from "postcss";

export interface ApiResponse{
    suscess: boolean;
    message: string;
    verifyCodeExpiry:Date;
    isAcceptingMessages?: boolean;
    messages?: Array<string>;
}