const TaskController = require("./app/controllers/TasksController");
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const panelRoutes = require("./app/routes/panel.routes");
const taskRoutes = require("./app/routes/task.routes");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Habilitar CORS
app.use(cors());

// Monta las rutas de paneles y tareas
app.use("/panel", panelRoutes);
app.use("/task", taskRoutes);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 8000; // Si PORT no está definido en .env, usa 8000 como predeterminado.
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    // Iniciar Apollo Server después de que la conexión a la base de datos sea exitosa
    startApolloServer();
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos", err);
    process.exit(1); // Detiene la ejecución del servidor si la conexión a la base de datos falla.
  });

// Crear una instancia del controlador de tareas y pasarle la instancia de Socket.IO

async function startApolloServer() {
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // Gestión de la conexión de Socket.IO
    io.on("connection", (socket) => {
      console.log("Nuevo cliente conectado");
      socket.on("NewTarea", (arg) => {
        console.log("Nueva tarea recibida:", arg);
        // Aquí puedes integrar la lógica para añadir tareas usando los resolvers o controladores
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado");
      });
    });

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (e) {
    console.error("Error al iniciar Apollo Server", e);
    process.exit(1); // Detiene la ejecución si Apollo Server no puede iniciar.
  }
}
