import { existsSync, promises } from 'fs';
import { productsManager } from './ProductManager';

const path = 'Carts.json';

class CartsManager {
    //Si existe me lee y lo retorno si no existe regresa un arreglo vacío 
    async getCart() {
        try {
            if(existsSync(path)) {
                const cartsFile = await promises.readFile(this.path, 'utf-8')
                const cartsData = JSON.parse(cartsFile)
                return cartsData;
            } else {
                return [];
            }
        } catch (error) {
            return error
        }
    }

    //Método para agregar productos al array inicial
    async addCart() {
        try {
            //Buscamos el arreglo con el método get
            const carts = await this.getCart()
            //Incrementar id
            let id
            if (!carts.length) {
                id = 1
            }
            else {
                id = carts[carts.length - 1].id + 1
            }
            //Agregar objetos al arreglo
            const newCart = { id, products: [] };
            carts.push(newCart)
            //Guardamos en el archivo sobreescribiendo si ya existe, si no se va a crear
            await promises.writeFile(path, JSON.stringify(carts))
            return newCart;
        } catch (error) {
            return error
        }
    }

    //Método para buscar que coincida con el ID solicitado
    async getcartById(id) {
        try {
            const carts = await this.getCart()
            const cart = carts.find((c)=>c.id===id)
            return cart
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //
    async addProductCart(idCart, idProduct) {
        // Validar que el carrito exista
        const cart = await this.getCartById(idCart);
        if (!cart) {
          throw new Error("There is no cart with this id");
        }
        // Validar que producto exista
        const product = await productsManager.getProductById(idProduct);
        if (!product) {
          throw new Error("There is no product with this id");
        }
        const productIndex = cart.products.findIndex(
          (p) => p.product === idProduct
        );
        if (productIndex === -1) {
          const newProduct = { product: idProduct, quantity: 1 };
          cart.products.push(newProduct);
        } else {
          cart.products[productIndex].quantity++;
        }
      }
}//Fin de la clase

export const cartsManager = new CartsManager();