const { isObjectIdOrHexString } = require("mongoose");
const Panel = require("../AA/app/models/Panel");
const Task = require("../AA/app/models/Task");

const resolvers = {
  Query: {
    getPanels: async () => {
      return await Panel.find().populate("tasks");
    },
    getPanelById: async (_, { panelId }) => {
      return await Panel.findById(panelId).populate("tasks");
    },
    getTasks: async () => {
      return await Task.find();
    },
    getTaskById: async (_, { taskId }) => {
      return await Task.findById(taskId);
    },
  },
  Panel: {
    tasks: async (parent) => {
      return await Task.find({ panel: parent._id });
    },
  },
  Task: {
    panel: async (parent) => {
      return await Panel.findById(parent.panel);
    },
  },
  Mutation: {
    // Task
    addTask: async (_, { title, status, panelId }) => {
      try {
        const newTask = new Task({
          title,
          status,
          panel: panelId,
        });
        console.log(newTask);
        await newTask.save();

        io.emit("taskCreated", newTask)

        return newTask;
      } catch (error) {
        // console.log("****************************************************");
        // console.log(error.errors.status.path);
        // console.log("****************************************************");
        if (error.errors.status.path == "status") {
          console.log("dentro");
          throw new Error("El tipo de status no es valido");
        } else {
          console.log("fuera");
          throw new Error("Error al crear la tarea.");
        }
      }
    },
    updateTask: async (_, { taskId, title, status, panelId }) => {
      try {
        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          { title, status, panel: panelId },
          { new: true }
        );
        return updatedTask;
      } catch (error) {
        throw new Error("Error al actualizar la tarea.");
      }
    },
    deleteTask: async (_, { taskId }) => {
      try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        return deletedTask;
      } catch (error) {
        throw new Error("Error al eliminar la tarea.");
      }
    },

    // Panel

    createPanel: async (_, { title, subtitle, description }) => {
      try {
        const newPanel = new Panel({
          title,
          subtitle,
          description,
        });
        await newPanel.save();
        return newPanel;
      } catch (error) {
        throw new Error("Error al crear el panel.");
      }
    },
    updatePanel: async (_, { panelId, title, subtitle, description }) => {
      try {
        const updatedPanel = await Panel.findByIdAndUpdate(
          panelId,
          { title, subtitle, description },
          { new: true }
        );
        return updatedPanel;
      } catch (error) {
        throw new Error("Error al actualizar el panel.");
      }
    },
    deletePanel: async (_, { panelId }) => {
      try {
        const deletedPanel = await Panel.findByIdAndDelete(panelId);
        return deletedPanel;
      } catch (error) {
        throw new Error("Error al eliminar el panel.");
      }
    },
  },
};

module.exports = { resolvers };
