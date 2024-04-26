# dockerize-a-nodejs-expressjs-mysql-reactjs-app
Dockerize a Nodejs ExpressJs Mysql ReactJS Application.


# Author
https://blog.openreplay.com/authors/joseph-chege/


# Note
- This Project is worked on `MACOSX`
- The other operating system doesn't check yet.


# Instruction
### I. Change password in `/api/index.js`
1. Create `contacts` db in mysql
2. Change the mysql root password:
    > `password: "root"` to `password: "your_pass"`

### II. Change password in `docker-compose.yml`
1. Change the `mysql_srv` MYSQL_ROOT_PASSWORD:
    > `MYSQL_ROOT_PASSWORD: root` to `MYSQL_ROOT_PASSWORD: your_pass`
2. Change the `backend_srv` MYSQL_PASSWORD:
    > `MYSQL_PASSWORD: root` to `MYSQL_PASSWORD: your_pass`

### III. Compose up code
After pull the docker repo run following command to compose the code:
> docker compose up --build
