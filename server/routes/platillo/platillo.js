const express = require('express');
const Platillo = require('../../models/platillo');
const platillo = require('../../models/platillo');
const app = express();

app.get('/obtenerPorCategoria/:idCat', (req, res) => {

    Platillo.find({ idCategoria: req.params.idCat }).then((resp) => {

        if (resp.length <= 0) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No hay platillos registrados',
                cont: {
                    resp
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se obtuvieron los platillos',
            cont: {
                resp
            }
        });

    }).catch((err) => {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al obtener los platillos',
            cont: {
                err
            }
        });
    });

});

app.get('/obtener/:id', (req, res) => {


    Platillo.findOne({ _id: req.params.id }).then((resp) => {

        if (!resp) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No existe el platillo',
                cont: {
                    resp
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se obtuvo el platillo',
            cont: {
                resp
            }
        });

    }).catch((err) => {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al obtener el platillo',
            cont: {
                err
            }
        });
    });

});

app.post('/registrar/:idCategoria', (req, res) => {

    let platillo = new Platillo({
        idCategoria: req.body.idCategoria,
        strNombre: req.body.strNombre,
        strDescripcion: req.body.strDescripcion,
        strIngredientes: req.body.strIngredientes,
        nmbPiezas: req.body.nmbPiezas,
        nmbPrecio: req.body.nmbPrecio,
        blnActivo: req.body.blnActivo
    });
    let id = req.params.id;
    new Platillo(platillo).save().then((resp) => {

        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se registro el platillo',
            cont: {
                resp
            }
        });

    }).catch((err) => {
        console.log('mmmmmm');

        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al registrar el platillo',
            cont: {
                err
            }
        });

    });

});

app.put('/actualizar/:id', (req, res) => {

    let platillo = new Platillo({
        _id: req.params.id,
        idCategoria: req.body.idCategoria,
        strNombre: req.body.strNombre,
        strDescripcion: req.body.strDescripcion,
        strIngredientes: req.body.strIngredientes,
        nmbPiezas: req.body.nmbPiezas,
        nmbPrecio: req.body.nmbPrecio,
        blnActivo: req.body.blnActivo
    });

    let err = platillo.validateSync();

    if (err) {
        return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'Error al actualizar el platillo',
            cont: {
                err
            }
        });
    }

    Platillo.findOneAndUpdate({ _id: req.params.id }, { $set: platillo }, { new: true }).then((resp) => {

        if (!resp) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No existe el platillo',
                cont: {
                    err
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se actualizo el platillo',
            cont: {
                resp
            }
        });

    }).catch((err) => {

        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al actualizar el platillo',
            cont: {
                err
            }
        });

    });

});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    platillo.findByIdAndUpdate(id, { blnActivo: false }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: false,
            status: 200,
            msg: 'Se activo ',
            cont: {
                resp
            }
        });

    }).catch((err) => {

        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al desactivar la categoria',
            cont: {
                err
            }
        });

    });

});
app.delete('/activar/:id', (req, res) => {
    let id = req.params.id;
    platillo.findByIdAndUpdate(id, { blnActivo: true }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se activo la categoria',
            cont: {
                resp
            }
        });

    }).catch((err) => {

        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al desactivar la categoria',
            cont: {
                err
            }
        });

    });

});

module.exports = app;