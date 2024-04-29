import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        organizer: String,

        description: String,

        location: String,

        startDate: Date,

        endDate: Date,

        registrationURL: String,

        imageURL: String
    })

export const Event = mongoose.model(`Event`, eventSchema);