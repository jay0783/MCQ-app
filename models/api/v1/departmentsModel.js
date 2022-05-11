export default (sequelize, DataTypes) => {
  const departments = sequelize.define(
    "departments",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      department_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return departments;
};
