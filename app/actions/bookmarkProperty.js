'use server'
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
    await connectDB();
    const sessionUser=await getSessionUser();
    if(!sessionUser ||!sessionUser.userId){
        throw new Error('userId is required');
    }
    const {userId}=sessionUser;
    const user= await User.findById(userId);
    let isBookmarked= user.bookmarks.includes(propertyId);

    let message;

    if(isBookmarked){
        user.bookmarks.pull(propertyId);
        message="Bookmark Removed successfully"
        isBookmarked=false;
    }else{
        user.bookmarks.push(propertyId);
        message="Bookmark added successfully"
        isBookmarked=true;
    }
    await user.save();
    revalidatePath('/properties/saved','page');
    return {
        message,
        isBookmarked
    }
}

export default bookmarkProperty;