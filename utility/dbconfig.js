module.exports.config = {
        server: process.env.SERVER, // Use your SQL server name
        database: process.env.DATABASE, // Database to connect to
        user: "testserver", // Use your username
        password: process.env.PASSWORD, // Use your password
        // Since we're on Windows Azure, we need to set the following options
        options: {
                encrypt: true,
        },
};
