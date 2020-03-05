import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  creator: { type: String, required: true },
  comment: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)
const Task = new Schema(
  {
    creatorEmail: { type: String, lowercase: true },
    title: { type: String, required: true },
    comments: [Comment],
    listId: { type: ObjectId, ref: 'List', required: true },
    boardId: { type: ObjectId, ref: 'Board', required: true }

    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);


export default Task;
