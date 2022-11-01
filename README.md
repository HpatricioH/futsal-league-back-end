# Futsal League Application Server Side

This is a API create for the web application for the Futsal League repository.

API provides all endpoints to CREATE, READ, UPDATE, DELETE, for players, teams, games and users.

The API is using MySQL as data source for the application.

## Installation

To run the API for the front end Futsal League web application follow the steps below.

(remember to clone the front end side of the [Futsal League](https://github.com/HpatricioH/futsal-league-client-side/tree/main))

1. In the server folder run `npm i` to install all the dependencies.
2. `.env` file need to be created in the **futsal-league-server-side** folder and include prisma authentication URL:

   `DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE`
   explanation for each component:

   - `USER`: The name of your database user
   - `PASSWORD`: The password for your database user
   - `PORT`: The port where your database server is running (typically `3306` for MySQL)
   - `DATABASE`: The name of the database

3. In the same `.env` file include a `PORT=8080` this is the expected port.
4. Once the environment variables are created run `npx prisma migrate dev --name init` this will create all the tables needed for the app to run.
   **NOTE:** if you see a warning when migrating the DB just press `y` and continue
5. The last step will be `npx prisma generate`
6. After this you are able to run the server with `node server.js`

**NOTE:** if you have nodemon package installed, you can run it with `nodemon server`
