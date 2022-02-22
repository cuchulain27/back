const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = Schema({
    title: String,
    readingTime: Number,
    mainImage: String,
    resumen: String,
    body: String,
    category: Number,
    meta: {
        created: Date,
        by: {
            name: String,
            avatar: String
        }

    }
})

module.exports = mongoose.model('blog', BlogSchema)