import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,

        startDate: Date,

        endDate: Date,

        goal: String,

        currentStatus: String,

        contributors: [String], // Could be used to reference User Schema if tracking specific users contributions

        imageURL: String,

        tags: [String]
})

export const Campaign = mongoose.model(`Campaign`, campaignSchema);