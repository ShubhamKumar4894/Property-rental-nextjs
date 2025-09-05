'use server'
import connectDB from "@/config/database";
import Message from "@/models/message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
    await connectDB();
    const sessionUser=await getSessionUser();
    if(!sessionUser ||!sessionUser.userId){
        throw new Error('userId is required');
    }
    const {userId}=sessionUser;
    const message= await Message.findById(messageId);
    if(!message){
        throw new Error("Message not found");
    }
    if(message.recepient.toString()!==userId){
        throw new Error('Unauthorized')
    }

    message.read=!message.read;
    revalidatePath('/messages','page')
    await message.save();

    return message.read;
}

export default markMessageAsRead;