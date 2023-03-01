# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).



### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database: `create database name_of_database`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=name_of_database
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'collabs' in your database.

- In your MySQL console, you can run `use mvp;` and then `describe collabs;` to see the structure of the collabs table.
- I chose to insert data into my database, but you can of course use for example postman, to insert rows of data. 
I mostly wanted to import a lot of data to reflect reality, but for development purposes it is not necessary.
- If you want to insert data through postman, I would suggest you have at least around 10 rows of data, with some names appearing several times, but with different platforms and dates.
- If you want to insert a file into your database, you can do it in the following way:
    - Add the data file into your project file
    - In your MySQL console, run the following:

        LOAD DATA LOCAL INFILE './file_name.csv'
        INTO TABLE table_name
        FIELDS TERMINATED BY ','
        ENCLOSED BY '"'
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS;
    
    - If you see the following error when you try to import…
    `ERROR 3948 (42000) at line 21: Loading local data is disabled;` this must be enabled on both the client and server sides
    ...then type this in the MySQL CLI and try again:
    `set global local_infile = true;`

- After you have data in you collabs file, create a new table called influencers with the following query in your MySQL console:
        
      DROP TABLE IF EXISTS influencers;
      CREATE TABLE influencers AS
      SELECT 
        DISTINCT influencer_name,
        handle,
        platform,
        MAX(followers) AS followers,
        price_ex_vat,
        MAX(date) AS date
      FROM influencers
      GROUP BY 1,2,3,5
      ORDER BY influencer_name, platform;

- The influencer table will only contain the data that is there upon creation in this way, so don't worry if new additions to the collabs table don't show up in the search results for the form. I didn't have the time to change the code so that it would re-create the table upon change.


### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.



