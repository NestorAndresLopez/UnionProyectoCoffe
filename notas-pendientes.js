
//verificar la consulta en los dao si esta bien usar callbarck para probar errores junto con la consulta asincrona
//si elimino todoslos clientes la pantalla de lista de clientes se congela hasta que entre a la pestaña crear cliente
// terminar de proteger las rutas y esconder el menu en el login y registro
// tener en cuenta la buena practica de probar primeros los errores para continuar con el codigo
//buena practica separar funciones por solo una accion ejemplo abajo
//router.post('/login', authController.getUser, authController.createSessionToken, authController.setCookie)
//los midlewares siempre van primero que las rutas 
//escondo el menu si no esta logiado con jwt, al ingresar sigue escondiendo las opciones pero si recargo por segunda vez ya aparecen