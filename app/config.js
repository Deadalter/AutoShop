/**
 * Created by deadalter on 13.04.2017.
 */

var config = {
    server : {
        port: 3000 //Порт приложения
    },
    db : {
        user: 'db_admin', //Имя пользователся для подключения к базе данных
        databases: 'heroku_rh8lp3d8', //Название базы данных
        password: 'cvn74cKH', //Пароль для подключения
        host: 'ds159880.mlab.com', //Хост базы данных
        port: 59880, //Порт подключения
    }
};

module.exports = config;