//Definimos las funciones que se ejecutarán cuando lleguen las consultas basadas en el tipos de datos.

//utilizaremos un paquete gql para trabajar con GraphQL y graphql-tools

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Panel {
    _id: ID
    title: String
    subtitle: String
    description: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    status: String
    panel: Panel
  }

  type Query {
    getPanels: [Panel]
    getPanelById(panelId: ID!): Panel
    getTasks: [Task]
    getTaskById(taskId: ID!): Task
  }

  type Mutation {
    addTask(title: String, status: String, panelId: ID!): Task
    updateTask(taskId: ID, title: String, status: String, panelId: ID!): Task
    deleteTask(taskId: ID): Task

    createPanel(title: String, subtitle: String, description: String): Panel
    updatePanel(
      panelId: ID
      title: String
      subtitle: String
      description: String
    ): Panel
    deletePanel(panelId: ID): Panel
  }
`;

module.exports = { typeDefs: typeDefs };
