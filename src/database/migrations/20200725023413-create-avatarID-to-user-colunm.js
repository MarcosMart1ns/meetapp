module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users','avatarId',{
      type: Sequelize.INTEGER,
      references: {model: 'files', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users','avatarId');
  }
};
