import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        },

        postedOn: {
            type: Date,
            default: Date.now
        },
    })

export const Comment = mongoose.model(`Comment`, commentSchema);