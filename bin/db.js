/**
 * Created by deadalter on 11.04.2017.
 */
const pg = require('pg');

//Переменная с данными для подключения к бд
var db_config = {
    user: 'mmoenejzepxizm', //Имя пользователся для подключения к базе данных
    databases: 'dael5g90uj2eer', //Название базы данных
    password: 'a553b2d3a9f2131a73baca48ea9f82decb5d68f07d93eb8ae175eb3c09712a44', //Пароль для подключения
    host: 'localhost', //Хост базы данных
    port: 5432, //Порт подключения
    max: 10, // Махимальное кол-во потоков
    idleTimeoutMillis: 30000 //Время простоя
};

var pool = new pg.Pool(db_config); //Инициализация базы данных

module.exports.query = function (text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
    return pool.connect(callback);
};