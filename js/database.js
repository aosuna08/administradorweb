import { ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { db } from './main.js';

export const databaseService = {
    // Insertar un nuevo producto
    async insertProduct(product) {
        try {
            await set(ref(db, 'Automoviles/' + product.numSerie), product);
            return { success: true, message: 'Producto agregado con éxito' };
        } catch (error) {
            console.error('Error al insertar producto:', error);
            return { success: false, message: 'Error al agregar el producto' };
        }
    },

    // Buscar un producto por número de serie
    async getProduct(numSerie) {
        try {
            const snapshot = await get(child(ref(db), `Automoviles/${numSerie}`));
            if (snapshot.exists()) {
                return { success: true, data: snapshot.val() };
            } else {
                return { success: false, message: 'No se encontró el producto' };
            }
        } catch (error) {
            console.error('Error al buscar producto:', error);
            return { success: false, message: 'Error al buscar el producto' };
        }
    },

    // Actualizar un producto
    async updateProduct(numSerie, updates) {
        try {
            await update(ref(db, 'Automoviles/' + numSerie), updates);
            return { success: true, message: 'Producto actualizado con éxito' };
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            return { success: false, message: 'Error al actualizar el producto' };
        }
    },

    // Eliminar un producto
    async deleteProduct(numSerie) {
        try {
            await remove(ref(db, 'Automoviles/' + numSerie));
            return { success: true, message: 'Producto eliminado con éxito' };
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            return { success: false, message: 'Error al eliminar el producto' };
        }
    },

    // Obtener todos los productos
    async getAllProducts() {
        try {
            const snapshot = await get(child(ref(db), 'Automoviles'));
            if (snapshot.exists()) {
                return { success: true, data: snapshot.val() };
            } else {
                return { success: true, data: {} };
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return { success: false, message: 'Error al obtener los productos' };
        }
    }
};
