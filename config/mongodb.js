import mongoose from "mongoose";

const connectDB = async () => {
    const optionalDb = process.env.MONGODB_OPTIONAL === 'true';
    const fallbackUri = (process.env.MONGODB_FALLBACK_URL || '').trim();

    const connectWithUri = async (uri, label) => {
        const fullUri = uri.replace(/\/$/, '');
        const safeUriForLog = fullUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
        console.log(`Connecting to MongoDB (${label}) with URI:`, safeUriForLog);

        await mongoose.connect(fullUri, {
            serverSelectionTimeoutMS: 10000
        });

        console.log(`MongoDB connected via ${label}, readyState=`, mongoose.connection.readyState);
        return true;
    };

    try {
        const baseUri = (process.env.MONGODB_URL || '').trim();
        if (!baseUri) {
            const msg = 'MONGODB_URL is not set in environment variables';
            console.error(msg);
            if (fallbackUri) {
                return await connectWithUri(fallbackUri, 'fallback');
            }
            if (optionalDb) {
                console.warn('MongoDB connection skipped because MONGODB_OPTIONAL=true');
                return false;
            }
            throw new Error(msg);
        }

        return await connectWithUri(baseUri, 'primary');
    } catch (error) {
        if (error?.name === 'MongooseServerSelectionError') {
            console.error(
                'MongoDB Atlas connection failed. Check Atlas Network Access/IP whitelist, cluster status, and database user credentials.'
            );
        }

        if (fallbackUri) {
            try {
                console.warn('Primary MongoDB connection failed. Trying fallback MongoDB URL...');
                return await connectWithUri(fallbackUri, 'fallback');
            } catch (fallbackError) {
                console.error('Fallback MongoDB connection also failed:', fallbackError);
                if (optionalDb) {
                    console.warn('Starting without MongoDB because MONGODB_OPTIONAL=true');
                    return false;
                }
                throw fallbackError;
            }
        }

        console.error('Failed to connect to MongoDB:', error);
        if (optionalDb) {
            console.warn('Starting without MongoDB because MONGODB_OPTIONAL=true');
            return false;
        }
        throw error;
    }
};

export default connectDB;
