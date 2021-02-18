
module.exports = function(sequelize, DataTypes) {
  const YTChannels = sequelize.define("YTChannels", {

    channelName: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });
 

  return YTChannels;
};
