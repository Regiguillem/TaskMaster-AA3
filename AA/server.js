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

const io = socketIo(3000);

const app = express();

// Habilitar CORS
app.use(cors());

// Monta las rutas de paneles
app.use("/panel", panelRoutes);
app.use("/task", taskRoutes);

const server = new ApolloServer({
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
    await server.start();
    server.applyMiddleware({ app });

    const taskController = new TaskController(io);

    app.listen(PORT, () => {
      console.log(
        `Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (e) {
    console.error("Error al iniciar Apollo Server", e);
    process.exit(1); // Detiene la ejecución si Apollo Server no puede iniciar.
  }
}
