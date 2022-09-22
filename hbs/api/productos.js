class Contenedor {
    constructor() {
        this.itemList = [];
		this.id = 0;

    }


    // Métodos

    // Recibe un producto y lo agrega al array itemList
     post(producto) {
		producto.id = ++this.id;
		this.itemList.push(producto);
    }

    // Reemplaza un producto en base a su id
    async put(id, producto) {
        try {
            const contenido = await this.getAll();
            const index = contenido.findIndex((p) => p.id === id);
            if(index >= 0){
                contenido.splice(index,1,{...producto, id});
                this.itemList = contenido;
                return producto;
            }else{
                console.log(`Producto con id: ${producto.id} no existe`)
                return null;
            }      
        }
        catch (err) {
            console.log("No se encontró un producto con ese id");
            return err;
        }


    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            const contenido = await this.getAll();
            const productoBuscado = contenido.filter((producto) => producto.id == id);
            if (productoBuscado != 0) {
                return productoBuscado;
            } else {
                //console.log(productoBuscado);
                console.log("Producto no encontrado");
                return null;
            }
        } catch (err) {
            console.log("Producto no encontrado", err);
            return err;
        }
    }

    // Devuelve un array con los objetos presentes en el archivo.
     getAll() {
			return this.itemList.length
			? this.itemList
			: {error: "No existen productos cargados"};
            // const contenido = this.itemList;
            // //console.log(contenido);
            // return  contenido;
    }

    async deleteById(id) {
        try {
            const contenido = await this.getAll();
            const idBuscado = contenido.filter((producto) => producto.id != id);
            this.itemList = idBuscado;
            console.log("Producto eliminado");
            return id;
        } catch (err) {
            console.log(err);
        }

    }


}


module.exports = Contenedor;