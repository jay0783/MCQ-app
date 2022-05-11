export default (sequelize, DataTypes) => {
  const campus_drives  = sequelize.define(
    'campus_drives',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      campus_drive_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      campus_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      campus_drive_token: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_candidate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_attempted: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      total_completed: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      start_datetime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      end_datetime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
  return campus_drives
}
