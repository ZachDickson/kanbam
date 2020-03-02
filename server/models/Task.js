import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    title: { type: String, required: true },
    comments: [{
      author: { type: String, required: true },
      comment: { type: String, required: true }
    }]

    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Task;
