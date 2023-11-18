const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Word-weave"
        });
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`MONGO Connect Error ${error}`.bgRed.white);
    }
};

module.exports = connectDB;