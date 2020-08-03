const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'categoria'
};

const categoria = mongoose.Schema({
    strNombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    strDescripcion: {
        type: String,
        required: [true, 'La descripcion es requerida']
    }
}, schemaOptions);

categoria.plugin(uniqueValidator, {
    message: '{VALUE} ya se encuentra registrado.'
});

module.exports = mongoose.model('categoria', categoria);