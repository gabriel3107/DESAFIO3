import express from 'express';

//Creando el servidor http usando express
const app = express();

const products = [
    { id: 1, title: 'manzana', description: 'fruta', price: 5, thumbnail: '',code: 'prod001', stock: '12'},
    { id: 2, title: 'galleta', description: 'golosina', price: 2, thumbnail: '',code: 'prod002', stock: '10' },
    { id: 3, title: 'arroz', description: 'abarrotes', price: 8, thumbnail: '',code: 'prod003', stock: '20' }
];

//Vamos a construir nuestro primer endpoint o servicio
//Vamos a revisar la petición http de tipo GET
// app.get('/saludo', (req, res) => {
//     res.send('Hola a todos este es mi primer endpoint desde express');
// });

// app.get('/bienvenida', (req, res) => {
//     res.send(`<h1 style="color:blue">Bienvenido a mi primer servidor de express</h1>`)
// });

// //Servicio usando un path param
// app.get('/unparametro/:nombre', (req, res) => {
//     res.send(`Bienvenido ${req.params.nombre}`);
// });

// app.get('/dosparametros/:nombre/:apellido', (req, res) => {
//     res.send(`Bienvenido ${req.params.nombre} ${req.params.apellido}`);
// });

//Debemos construir un servicio que me permita obtener un usuario por su id
//El identificador del usuario que vamos a buscar lo obtenemos mendiante un path param
//Todo lo que envieemos como path param siempre es una cadena de texto
app.get('/productos/:id', (req, res) => {
    const producId = Number(req.params.id);
    const produc = products.find(p => p.id === producId);
    if (!produc) return res.send({ error: 'producto no encontrado' });
    res.send(produc);
});

app.get('/productosquery', (req, res) => {
    // req.query {
    //     edad: 28,
    //     genero: 'M',
    //     nombre: 'Alex'
    // }
    const queryParams = req.query;
    res.send(queryParams);
});

app.get('/productos', (req, res) => {
    //Obtenemos el genero del query param
    const producto = req.query.description;
    //Siempre importante hacer validaciones
    //En el caso de que no llegue el genero o el genero sea diferente de M o F retornamos los usuarios sin filtrar
    if(!description||(description!=='fruta'&&description!=='golosina'&&description!=='abarrotes')) return res.send({products});
    //filtramos los usuarios por genero
    const filteredproduc = products.filter(produc=>produc.description===description);
    res.send({productos: filteredproduc});
});

app.listen(8080, () => console.log('Listening on port 8080'));