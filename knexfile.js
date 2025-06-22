module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,

    connection: {
      filename: "./src/database/database.sqlite",
    },

    migrations: {
      directory: "./src/database/migrations",
    },

  },
};
