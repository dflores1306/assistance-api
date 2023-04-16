const { Assistance, AssistanceSchema} = require("./assistance.model");

function setupModels(sequelize) {
  Assistance.init(AssistanceSchema, Assistance.config(sequelize));
}

module.exports = setupModels;
