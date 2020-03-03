import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema({
  creator: { type: String, required: true },
  comment: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)
const Task = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    title: { type: String, required: true },
    comments: [Comment]

    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);


export default Task;
