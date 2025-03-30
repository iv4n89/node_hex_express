import mongoose from 'mongoose';

const mongoConnection = async (uri: string): Promise<void> => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export default mongoConnection;