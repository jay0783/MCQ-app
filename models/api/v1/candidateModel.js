export default (sequelize, DataTypes) => {
  const candidates = sequelize.define(
    "candidates",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      candidate_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      department_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      experience_months: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      experience_label: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      candidate_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      campus_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      campus_drive_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      candidate_ip_address: {
        type: DataTypes.STRING,
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
  return candidates;
};
