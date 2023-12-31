const express = require('express');
const cors = require('cors');
const app = express();
const puerto = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


//Arreglo de objeto de categorias
let categoria = [
    {id:1, nombre:"Cocina", descripcion: "Elementos para cocinar"},
    {id:2, nombre:"Limpieza", descripcion: "Elementos para limpiar"},
    {id:3, nombre:"Electrónica", descripcion: "Elementos electrónicos"},
    {id:4, nombre:"Ropa bebé", descripcion: "Elementos para bebé"},
    {id:5, nombre:"Línea blanca", descripcion: "Elementos de hogar"},
    {id:6, nombre:"Jardinería", descripcion: "Elementos para jardín"},
    {id:7, nombre:"Salud", descripcion: "Elementos de salud",},
    {id:8, nombre:"Muebles", descripcion: "Elementos para la sala"},
    {id:9, nombre:"Lacteos", descripcion: "Elementos para refrigerar"},
    {id:10, nombre:"Licores", descripcion: "Elementos para fiestas"}
];

app.get('/socios/v1/categorias', (req,res)=>{
    //Se muestran todas las categorias
    //1. Verificar si existen categorias
    if (categoria.length>0) {
        //2. Mostrarlas con un estado y un mensaje
        res.status(200).json({
            estado:1,
            mensaje: "Existen categorias",
            categoria : categoria
        });
    }else{
        //3. Si no existen, mostrar estado y mensaje
        //En formato json
        //4.Mostrar mensajes de estado del servidor 
        res.status(404).json({
            estado:0,
            mensaje:"No se encontraron categorias",
            categoria : categoria
        });
    }

});

app.get('/socios/v1/categorias/:id', (req,res)=>{
    //Se muestra una categoria
    const id = req.params.id;
    //Programación funcional - No se establece el cómo, solo el qué
    const cat = categoria.find(cat =>cat.id == id);
    //Sí se econtró una categoria
    if (cat) {
        res.status(200).json({
            estado : 1,
            mensaje : "Se encontró la categoria",
            categoria : cat
        });
    } else {
        //No se encontró una categoria
        res.status(404).json({
            estado:0,
            mensaje:"No se encontró la categoria",
            categoria : {}
        });
    }
});

app.post('/socios/v1/categorias', (req,res)=>{
    //Crear un recurso - Crear categoria
    //Requerimos el
    // id = generar un número aleatorio
    // nombre / descrpción = vendrán del body
    const {nombre, descripcion} = req.body;


    const id = Math.round(Math.random()*1000);

    //Comprobar que el cliente - usuario - programador haya llenado todos los campos
    if (nombre == undefined || descripcion == undefined) {
        // Hay un error en la solicitud por parte del programador
        res.status(400).json({
        estado : 0,
        mensaje : "Faltan parámetros en la solicitud"
        });
    }else{
        // En js cómo agregar un nuevo elemento a un arreglo
        const longitudInicial = categoria.length;
        const cat = {
            id : id,
            nombre : nombre,
            descripcion : descripcion
        };
        const longitudFinal = categoria.push(cat);
         
        if (longitudFinal > longitudInicial) {
            //Todo OK de parte del cleinte y el servidor creó el recurso
            res.status(201).json({
                estado : 1,
                mensaje : "Categoria creada correctamente",
                categoria : cat
            });
        } else {
            //Error del servidor
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrió un error desconocido",
                categoria : cat
            });
        }
    }
});

app.put('/socios/v1/categorias/:id', (req, res) => {
    // Actualizar un recurso del servidor - Actualizar una categoria
    // Recuperar el ID de la categoría a actualizar
    const id = parseInt(req.params.id);

    // Recuperar los datos enviados por el usuario en el cuerpo de la solicitud
    const { nombre, descripcion } = req.body;

    // Buscar la categoría existente por su ID
    const categoriaExistente = categoria.find(cat => cat.id === id);

    if (!categoriaExistente) {
        // Si no se encuentra la categoría, responder con un estado 404 (No encontrado)
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontró la categoría para actualizar",
            categoria: {}
        });
    } else {
        // Si se encuentra la categoría, actualizar los datos
        if (nombre !== undefined) {
            categoriaExistente.nombre = nombre;
        }

        if (descripcion !== undefined) {
            categoriaExistente.descripcion = descripcion;
        }

        res.status(200).json({
            estado: 1,
            mensaje: "Categoría actualizada correctamente",
            categoria: categoriaExistente
        });
    }
});

app.delete('/socios/v1/categorias/:id', (req, res) => {
    // Eliminar un recurso del servidor - Eliminar una categoria
    const id = parseInt(req.params.id);

    // Buscar la categoría por su ID
    const indiceCategoria = categoria.findIndex(cat => cat.id === id);

    if (indiceCategoria === -1) {
        // Si no se encuentra la categoría, responder con un estado 404 (No encontrado)
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontró la categoría para eliminar",
            categorias: []
        });
    } else {
        // Si se encuentra la categoría, eliminarla del arreglo
        const categoriaEliminada = categoria.splice(indiceCategoria, 1);

        res.status(200).json({
            estado: 1,
            mensaje: "Categoría eliminada correctamente",
            categorias: []
        });
    }
});


app.listen(puerto,()=>{
    console.log('Servidor corriendo en el puerto: ', puerto);
});