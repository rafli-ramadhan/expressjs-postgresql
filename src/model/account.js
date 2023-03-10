// model name : user
// table name : user_db

module.exports = (DataTypes, sequelize) => {
  Account = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      username: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: ""
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: ""
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      gender: {
        type: DataTypes.ENUM(['male', 'female']),
        defaultValue: "male"
      },
      role: {
        type: DataTypes.ENUM(['admin', 'member']),
        defaultValue: "member"
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    {
      tableName: 'user_db'
    }
  );
  return Account;
}