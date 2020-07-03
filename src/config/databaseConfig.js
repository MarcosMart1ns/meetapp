module.exports = {
    dialect : "sqlite",
    storage : './src/database/database.sqlite',
    database : 'meetapp',
    define: {
        underscored: true,
        underscoredAll: true,
    }
}