import mongoose from 'mongoose';
import { User } from '../models/userModel.js';

const articleSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

export const Article = mongoose.model(`Article`, articleSchema); 