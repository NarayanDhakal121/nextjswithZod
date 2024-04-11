import { Message } from "postcss";

export interface ApiResponse{
    suscess: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<string>;
}