import mongoose from 'mongoose'

const MONGODBURI = `${process.env.MONGODB_URI}`;

if(!MONGODBURI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function connectMongoDB(): Promise<void> {
    if(mongoose.connection.readyState >= 1) {
        return;
    }
    try{
        await mongoose.connect(MONGODBURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}