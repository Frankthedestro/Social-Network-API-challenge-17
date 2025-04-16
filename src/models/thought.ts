import { Schema, model } from 'mongoose';
import Reaction from './reaction';

// Thought model
const thoughtSchema = new Schema({ 
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [Reaction.schema]
}, { toJSON: { virtuals: true }, id: false });

//added virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
}); 

const Thought = model('Thought', thoughtSchema);
export default Thought; 
// Export Thought model