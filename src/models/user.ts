import { Schema, model} from 'mongoose';

// Username model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+@.+\..+/
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
    }, { toJSON: { virtuals: true }, id: false });

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create User model
const User = model('User', userSchema);
export default User;
// Export User model