import mongoose, {Schema,Document} from "mongoose";

export interface IContactMsg extends Document{
    name:string;
    email:string;
    msg:string;
} 

const contactMsgSchema: Schema = new Schema({
    name:{
        type: String,
        required:[true,'Please name is required']
    },
    email:{
        type:String,
        required:[true,'Please email is required']
    },
    msg:{
        type:String,
        required:[true,'Please msg is required']
    }
});

const ContactMsg = mongoose.model<IContactMsg>('ContactMsg',contactMsgSchema);
export default ContactMsg;