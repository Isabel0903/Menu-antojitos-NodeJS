const express = require('express');
const Categoria = require('../../models/categoria');
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
        strDescripcion: req.body.strDescripcion
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
            msg: 'Error al registrar la categoria',
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
        strDescripcion: req.body.strDescripcion
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

    Categoria.findByIdAndRemove(req.params.id).then((resp) => {

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
            msg: 'Se elimino la categoria',
            cont: {
                resp
            }
        });

    }).catch((err) => {

        res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al eliminar la categoria',
            cont: {
                err
            }
        });

    });

});

module.exports = app;