import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: 
            String,
        
        content: 
            String,
        
        summary: 
            String,
    
        publishedDate: 
            Date,
        
        source: 
            String,
        
        imageURL: 
            String,

        tags:
            [String]
        
    });

export const Article = mongoose.model(`Article`, articleSchema);