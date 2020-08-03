const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'platillo'
};

const platillo = mongoose.Schema({
    idCategoria: {
        type: mongoose.Types.ObjectId,
        ref: 'categoria',
        required: [true, 'La categoria es requerida']
    },
    strNombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    strDescripcion: {
        type: String,
        required: [true, 'La descripcion es requerida']
    },
    strIngredientes: {
        type: String,
        required: [true, 'Los ingredientes son requeridos']
    },
    nmbPiezas: {
        type: Number,
        required: [true, 'Las piezas son requeridas']
    },
    nmbPrecio: {
        type: Number,
        required: [true, 'El precio es requerido']
    }
}, schemaOptions);

platillo.plugin(uniqueValidator, {
    message: '{VALUE} ya se encuentra registrado.'
});

module.exports = mongoose.model('platillo', platillo);