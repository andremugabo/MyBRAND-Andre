import mongoose,{Schema,Document} from "mongoose";
export interface IUsers extends Document{
    u_fullName: string;
    u_email:string;
    u_password:string;
    u_pic:string;
    u_desc:string;
}

const userSchema: Schema = new Schema({
    u_fullName :{
        type:String,
        required:[true,'Please enter your fullName']
    },
    u_email:{
        type:String,
        required:[true,'Please enter your email']
    },
    u_password:{
        type:String,
        required:[true,"Please enter your password"]
    },
    u_pic:{
        type:String,
    },
    u_desc:{
        type:String,
    }
});
const Users = mongoose.model<IUsers>('Users',userSchema);
export default Users;