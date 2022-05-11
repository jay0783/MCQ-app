export default (sequelize, DataTypes) => {
  const CandidateExamsModel = sequelize.define(
    "candidate_exams",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      candidate_exam_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      candidate_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      campus_drive_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      total_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_correct_answers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      exam_started_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      exam_ended_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return CandidateExamsModel;
};
