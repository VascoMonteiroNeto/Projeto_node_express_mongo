const mongoose = require('mongoose')

const autorSchema = new mongoose.Schema({
    nome: {
            type: String,
            required: true
    }
})

module.exports = mongoose.model('Autor', autorSchema)