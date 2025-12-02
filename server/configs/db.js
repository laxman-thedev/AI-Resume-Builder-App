import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log('Database connected successfully');
        })

        let mongodbURI = process.env.MONGODB_URI;
        const projectName = 'resume-builder';

        if (!mongodbURI) {
            throw new Error('Please set the MONGODB_URI environment variable');
        }
        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

export default connectDB 