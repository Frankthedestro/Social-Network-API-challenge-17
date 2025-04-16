import { Schema, Types } from 'mongoose';

// Reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date: Date) => date.toLocaleDateString()
    }
}, { toJSON: { getters: true }, id: false });

export default reactionSchema;
// Export Reaction schema for use in Thought model