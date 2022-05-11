export default (sequelize, Sequelize) => {
  const exam_questions = sequelize.define(
    "candidate_exam_questions",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      candidate_exam_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      question_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      question_option_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: null,
      },
      question_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  return exam_questions;
};
