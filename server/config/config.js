// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Conexión de BD
if (process.env.NODE_ENV === 'env') {
    process.env.URLDB = 'mongodb://localhost:27017/antojitosmx';
} else {
    process.env.URLDB = 'mongodb://localhost:27017/antojitosmx';
}