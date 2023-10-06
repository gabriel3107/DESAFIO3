import { promises } from 'fs';
const { error } = require('console');
// const fs = require('fs');


export default class ProductManager {

    constructor(path) {
        this.path = path;
        // this.productos = []
    };

    getProduct = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const product = JSON.parse(data);
                return product
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };

    agregarProductos = async (producto) => {
        try {
            const product = await this.getProduct();
            if (product.length === 0) {
                producto.id = 1;
            } else {
                producto.id = product[product.length - 1].id + 1;
            }

            product.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'));

            return producto;

        } catch (error) {
            console.log(error)
        }
    };


    getProductById = async (id) => {

        const data = fs.promises.readFile('productos.json');
        const product = JSON.parse(data); 

        const productencontrado = this.product.find(product => product.id === id);

        if (productencontrado) {
            console.log('producto encontrado : ', product)
            
        }else{
            console.log('producto no encontrado');
        }
        return productencontrado;
    };

    deleteProduct = async (id) => {
        try {
            let products = await this.getProduct();
            const index = products.findIndex(product => product.id === id);
    
            if (index !== -1) {
                products.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log('Producto eliminado correctamente.');
            } else {
                console.log('Producto no encontrado.');
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };


    updateProduct = async (id,updateprod) => {
        try {
            const products = await this.getProduct();
            const productIndex = products.findIndex((product) => product.id === id);

            if (productIndex === -1) {
                throw new Error("Producto no encontrado para actualizar");
            }

            const updatedProduct = { ...products[productIndex], ...updateprod };
            products[productIndex] = updatedProduct;

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw error; 
        }
    }

}


// module.exports = {
//     ProductManager
// }
