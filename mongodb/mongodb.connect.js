'use strict';

const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://dbUser:${process.env.PASSWORD_TO_REMOTE_MONGO_DATA_BASE}@cluster0.yjcdc.mongodb.net/Cluster0?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch (error) {
        console.log('Error connecting to mongodb');
        console.error(error);
    }
}

module.exports = { connect };
