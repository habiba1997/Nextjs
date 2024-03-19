import mongoose from "mongoose"

const connection = {};

export const connectToDb = async () => {
    try {
        // WHENEVER WE REFRESH IT WILL CREATE A NEW CONNECTION
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        // creating a new connection
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log("ERROR: ", error);
        throw new Error(error);
    }
};
