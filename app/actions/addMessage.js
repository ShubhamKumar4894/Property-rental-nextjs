'use server'
import connectDB from "@/config/database";
import Message from "@/models/message";
import { getSessionUser } from "@/utils/getSessionUser";
async function addMessage(previousState,formData) {
    await connectDB();
    const sessionUser= await getSessionUser();
    if(!sessionUser ||!sessionUser.userId){
        throw new Error('userId is required');
    }
    const {userId}=sessionUser;
    const recepient=formData.get('recepient');
    if(userId===recepient){
        return{error:"you cannot send mesage to yourself"};
    }
    const newMessage= new Message({
        sender:userId,
        recepient,
        property:formData.get('property'),
        name:formData.get('name'),
        email:formData.get('email'),
        phone:formData.get('phone'),
        body:formData.get('body')
    })
    await newMessage.save();
    return {submitted:true};
}
export default addMessage;