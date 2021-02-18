
module.exports = function(sequelize, DataTypes) {
  const YTPlaylists = sequelize.define("YTPlaylists", {

  
    playlistId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });
 

  return YTPlaylists;
};
