import io from "socket.io-client";

const socket = io("http://localhost:8888");

const newTask = () => {
  const title = document.getElementById("title").value;
  const panelId = document.getElementById("panelId").value;
  const status = document.getElementById("status").value;
  const tarea = {
    title,
    status,
    panelId,
  };
  socket.emit("NewTarea", tarea);
};