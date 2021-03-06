# GitTrending

Discover, contribute to, or glean inspiration from crowdsourced repos. Login to up/down vote repos, add topics, and/or add repositories. Or simply browse repos & topics without logging in. GitLists has made finding repositories more efficient, more collaborative. Help make this site even more helpful by voting repos up or down.

## Front End technologies/frameworks/libraries:
* HTML5/CSS3/Javascript (ES6)
* handlebars.js
* tachyons.io
* flexbox
* vex-js

## Back end technologies/frameworks/libraries:
* MySQL
* sequelize & sequelize-cli
* GitHub API
* OAuth
* Passport
* Bluebird/async await
* Express
* Node

## Testing frameworks:
* Mocha
* Chai
* Chai http
* Test DB

<p align="center">
  <img src="/readme.png?raw=true" alt="ScreenShot of my site"/>
</p>

### Add configuration files

To add configuration files that's been gitignored:

1. Go to `config` directory, and put in the relavent info (password, db name) in the `config.json` file. this will allow sequelize to connect with the database
2. In `config` directory, make an `auth.json` file similar to `auth.example.json` file, with KEY and SECRET sent out.

### Initialize and migrate data

To populate tables and seed data, run below steps in the root of this repo:

1. install sequelize-cli globally if haven't done so `npm install sequelize-cli -g`
2. `mysql -u <user_name_usualy_root> -p < ./db/schema.sql`
3. if asked to run, run it `sequelize init`
4. `sequelize db:migrate` this will migrate(generate) ALL the new tables or seed data in the migration directory
5. `sequelize db:migrate:undo` this will revert ONE most recent migration. To remove all the migrations, you can keep running this command to eventually drop all the seed data and table
6. At early stage, it's possible to always `sequelize db:migrate:undo` to rollback to ground 0 with a clean table and/or db
