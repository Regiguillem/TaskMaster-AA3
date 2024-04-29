const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TasksController");
const taskController = new TaskController();

router.get("/tasks", taskController.getAllTasks);

// Exportar el router para poder montarlo en el archivo principal de la aplicación.
module.exports = router;


// Extensión de la ruta
const extension = "/task";


router.get(extension + "/:taskId", async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});


router.get(extension + "/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await taskController.getTaskById(taskId);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la tarea' });
  }
});


module.exports = router;
