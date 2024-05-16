const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    niche: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
})

module.exports = mongoose.model('Supplier', supplierSchema)