export default (sequelize, DataTypes) => {
    const campuses = sequelize.define(
      'campuses',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        campus_uuid: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4
        },
        campus_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        placement_officer_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        placement_officer_number: {
          type: DataTypes.STRING,
          allowNull: false
        },
        campus_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contact_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null
        },
        state_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1
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
    return campuses
  }
  