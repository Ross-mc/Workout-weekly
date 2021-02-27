const config = (env) => {

  const db_config = {
    "development": {
      "username": "root",
      "password": "Poppy2537",
      "database": "workout_weekly_db",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "use_env_variable": "JAWSDB_URL",
      "dialect": "mysql",
      "host": process.env.DB_HOST,
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB
  
    }
  }

  return db_config[env];
}


module.exports = config;