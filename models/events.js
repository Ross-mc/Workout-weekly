
module.exports = function(sequelize, DataTypes) {
  const Events = sequelize.define("Events", {

    timeStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDesc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
 

  return Events;
};
