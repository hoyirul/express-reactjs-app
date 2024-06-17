module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', { timestamps: false });
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: 'roles',
        },
        key: 'id'
      },
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    tableName: 'users',
    underscored: false
  });

  User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

  return User;
}