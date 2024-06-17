module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { timestamps: false });
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
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
    tableName: 'roles',
    underscored: false
  });

  Role.hasMany(User, { foreignKey: 'roleId', as: 'user' });

  return Role;
}