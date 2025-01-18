// import { Document, Schema, model, models } from "mongoose";

// export interface IUser extends Document {
//     clerkId: string; // Clerk user ID
//     email: string;
//     username: string;
//     photo?: string; // Optional profile photo URL
//     firstName: string;
//     lastName: string;
//     planId?: string; // Optional plan information
//     creditBalance: number; // User's credit balance
    
// }


// const UserSchema = new Schema<IUser>(
//     {
//         clerkId: { type: String, required: true, unique: true },
//         email: { type: String, required: true, unique: true },
//         username: { type: String, required: true, unique: true },
//         photo: { type: String, required: true }, // URL for profile photo
//         firstName: { type: String, required: true },
//         lastName: { type: String, required: true },
//         planId: { type: String }, // Optional
//         creditBalance: { type: Number, default: 0 },
        
//     },
//     { timestamps: true } // Automatically manage createdAt and updatedAt
// );

// const User = models?.User || model<IUser>("User", UserSchema);

// export default User;








import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 10,
  },
});

const User = models?.User || model("User", UserSchema);

export default User;