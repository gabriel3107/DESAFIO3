import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager('./files/productos.json');

app.use(express.urlencoded({extended: true}));


app.get('/products', async (req, res) => {
    const products = await productManager.getAll();
    res.send(products);
})


app.get('/', async (req,res)=> {
    const products = await productManager.getAll();
    res.send({products});
})

app.listen(8080,()=>console.log("Listening on 8080"))