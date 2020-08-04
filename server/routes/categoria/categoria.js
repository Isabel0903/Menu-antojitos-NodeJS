const express = require('express');
const Categoria = require('../../models/categoria');
const categoria = require('../../models/categoria');
const app = express();

app.get('/obtener', (req, res) => {

    Categoria.find().then((resp) => {

        if (resp.length <= 0) {
            res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No hay categorias registradas',
                cont: {
                    resp
                }
            });
        }

        res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se obtuvieron las categorias',
            cont: {
                resp
            }
        });

    }).catch((err) => {
        res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al obtener las categorias',
            cont: {
                err
            }
        });
    });

});

app.get('/obtener/:id', (req, res) => {

    Categoria.findOne({ _id: req.params.id }).then((resp) => {

        if (!resp) {
            res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No existe la categoria',
                cont: {
                    err
                }
            });
        }

        res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se obtuvo la categoria',
            cont: {
                resp
            }
        });

    }).catch((err) => {
        res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al obtener la categoria',
            cont: {
                err
            }
        });
    });

});

app.post('/registrar', (req, res) => {

    let categoria = new Categoria({
        strNombre: req.body.strNombre,
        strDescripcion: req.body.strDescripcion,
        blnActivo: req.body.blnActivo
    });

    new Categoria(categoria).save().then((resp) => {

        res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se registro la categoria',
            cont: {
                resp
            }
        });

    }).catch((err) => {

        res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Ya esta registrada la categoria',
            cont: {
                err
            }
        });

    });

});

app.put('/actualizar/:id', (req, res) => {

    let categoria = new Categoria({
        _id: req.params.id,
        strNombre: req.body.strNombre,
        strDescripcion: req.body.strDescripcion,
        blnActivo: req.body.blnActivo
    });

    let err = categoria.validateSync();

    if (err) {
        res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'Error al actualizar la categoria',
            cont: {
                err
            }
        });
    }

    Categoria.findOneAndUpdate({ _id: req.params.id }, { $set: categoria }, { new: true }).then((resp) => {

        if (!resp) {
            res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No existe la categoria',
                cont: {
                    err
                }
            });
        }

        res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se actualizo la categoria',
            cont: {
                resp
            }
        });

    }).catch((err) => {

        res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al actualizar la categoria',
            cont: {
                err
            }
        });

    });

});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { blnActivo: false }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: false,
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
app.delete('/activar/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { blnActivo: true }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
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