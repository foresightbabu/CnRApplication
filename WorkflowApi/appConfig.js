module.exports = {
    app: {
        dev: {
            port: 3000,
            domain: "http://localhost"
        },
        prod: {
            port: 1405,
            domain: "http://localhost"
        }
    },
    db: {
        server: 'DESKTOP-P579ABQ',
        database: 'PaperlessOffice',
        user: 'sa',
        password: 'P$$$2018$$',
        port: 1433,
        pool: {
            max: 100,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false
        },
        parseJSON: true
    }
}