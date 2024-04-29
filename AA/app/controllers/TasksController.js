const Task = require("../models/Task");

class TaskController {
  constructor(io) {
    this.io = io; // Pasamos el objeto de Socket.IO al constructor
  }
  // Get todas las tareas
  getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Método para emitir un evento cuando se agregue una nueva tarea
  emitNewTaskEvent = (task) => {
    this.io.emit("newTask", task); // Emitimos un evento 'newTask' con la nueva tarea
  };

  // Método para emitir un evento cuando se actualice una tarea
  emitUpdateTaskEvent = (task) => {
    this.io.emit("updateTask", task); // Emitimos un evento 'updateTask' con la tarea actualizada
  };

  // Método para emitir un evento cuando se elimine una tarea
  emitDeleteTaskEvent = (taskId) => {
    this.io.emit("deleteTask", taskId); // Emitimos un evento 'deleteTask' con el ID de la tarea eliminada
  };
}

module.exports = TaskController;
