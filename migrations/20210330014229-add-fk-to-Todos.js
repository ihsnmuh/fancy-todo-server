"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Todos", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Todos", "UserId");
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  },
};
