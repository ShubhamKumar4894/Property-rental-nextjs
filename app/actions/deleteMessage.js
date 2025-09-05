'use server'
import Message from "@/models/message"
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
async function deleteMessage(messageId){
    await connectDB();
    const sessionUser=await getSessionUser();
    if(!sessionUser||!sessionUser.userId){
        throw new Error("userId is required");
    }
    const {userId}=sessionUser;
    const message= await Message.findById(messageId);
    if(message.recepient.toString()!==userId){
        throw new Error("Unauthorized");
    }
    await message.deleteOne();
    revalidatePath('/','layout');

}
export default deleteMessage;