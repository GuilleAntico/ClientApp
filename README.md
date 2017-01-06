# Client App
    Client App created with AngularJs and Express Framework.
##Pre requisite
* npm installed globally
* bower installed globally
##SQL
1. First create a mysql database.

2. Go to `config/config_development.js`
    ```javascript
        config = {
            db: {
                host: process.env.host || 'host (localhost)',
                user: process.env.user || 'database-username',
                password: process.env.password || 'database-password',
                database: process.env.database || 'database-name',
                port: process.env.port || database-port(3306),
                charset: 'utf8'
            },
            PORT : process.env.PORT || app-port(3000)
        };
    ``` 
    Replace values with your database information. Note: as you can see the file change depending the NODE_ENV variable. For production setup you can leave only ENV variables.

3. Go to `config/sequelize.js`
    ```javascript
            dialectOptions: {
                socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
            }
    ```
    The only change needed here is setting the `socketPath`. 
    * if you run the app with a MAMP server this is the path: `/Applications/MAMP/tmp/mysql/mysql.sock`
    * if you have osx with mysql installed run `mysqladmin variables` and check for the `socket` variable
    * if you have linux with mysql installed the path should be: `/var/run/mysqld/mysqld.sock`

##Developer Setup

1. In the root directory run `npm install`

2. Go to `public` directory and run `bower install`

3. In the root directory run `npm run dev`. This will create the database tables and start the api 
at the PORT set in `config/config_development.js`

##Swagger

1. After the app has started, assuming you run it in port 3000 you can visit `http:localhost:3000/swagger` and test 
the API endpoints



