import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Add text value'],
        },
    },
    {
        timestamps: true,
    }
);

const Goal = mongoose.model('fuck', goalSchema);
export default Goal;
