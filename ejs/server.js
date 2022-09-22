const express = require("express");
const Contenedor = require("./api/productos.js");
const router = express.Router();

let productos = new Contenedor();

const app = express();

//--------------------------------------------
//establecemos la configuración de ejs

app.set("view engine", "ejs");
app.set("views", "./views");
//--------------------------------------------

app.use(express.static("public"));

app.use("/api", router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos/listar",  (req, res) => {
	res.json(productos.getAll());
});

router.get("/productos/listar/:id", async (req, res) => {
	const id = Number(req.params.id);
	const cont = await productos.getById(id);
	cont == null ? res.json({ error: "producto no encontrado" }) : res.json(cont);
});

router.post("/productos/guardar", (req, res) => {
	const producto = req.body;
	productos.post(producto);
	res.redirect("/");
});

router.put("/productos/actualizar/:id", async (req, res) => {
	const { title, price, thumbnail } = req.body;
	const id = await productos.put(Number(req.params.id),
		{ title, price, thumbnail });
	res.json(id)
});

router.delete("/productos/borrar/:id", async (req, res) => {
	const borrar = await productos.deleteById(Number(req.params.id));
	res.json(
		borrar !== null ? { message: `Se elimnó el producto con id: ${borrar}` } : { error: "Producto no encontrado" }
	)
});

router.get("/productos/vista",  (req, res) => {
    const prods = productos.getAll();

	res.render("layouts/index", {
		productos: prods,
		hayProductos: prods.length,
	});
});

const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));