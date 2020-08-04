require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar las rutas
app.use('/api', require('./routes/index'));


// //Rutas
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use('/api', require('./routes/index'));

// //CORS 
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PATCH, PUT, DELETE, OPTIONS'
//     );
//     next();
// });

//Conexion MongoDB
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((resp) => {
    console.log(`[SERVER] Base de datos ONLINE en ${process.env.URLDB}`);
}).catch((err) => {
    console.log(`[SERVER] Conexion fallida: ${err}`);
});

app.listen(process.env.PORT, () => {
    console.log(`[SERVER] Escuchando en el puerto ${process.env.PORT}`);
});