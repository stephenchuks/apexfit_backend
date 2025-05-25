import mongoose from 'mongoose';
import createHttpError from 'http-errors';
/**
 * Connects to MongoDB. Returns a promise that resolves when connected.
 */
export async function connectDB() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw createHttpError.InternalServerError('Missing MONGO_URI in environment');
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected');
    }
    catch (err) {
        console.error('❌ MongoDB connection error:', err.message || err);
        throw createHttpError.InternalServerError('Failed to connect to MongoDB');
    }
}
