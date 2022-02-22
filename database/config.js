const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN).then(() => {
            console.log("CONECTADO A MONGO")
        });

    } catch (error) {
        console.log(error);
        throw new error('Error al iniciar la base de datos')

    }
}

module.exports = {
    dbConnection
}