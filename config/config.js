const config = {
    development: {
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: "read_well",
        host: "readwell.clyrq5kbck4j.ca-central-1.rds.amazonaws.com",
        dialect: "mysql"
    },
    test: {
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: "refactor",
        host: "localhost",
        dialect: "mysql"
    },
    production: {
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: "read_well",
        host: "readwell.clyrq5kbck4j.ca-central-1.rds.amazonaws.com",
        dialect: "mysql"
    }
}

module.exports = config;