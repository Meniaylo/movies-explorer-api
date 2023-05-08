# Movies-explorer
### бэкенд дипломной работы курса "Веб-разработчик" в Яндекс.Практикум
<br/>

### Документация к API:
```
POST /signup
```
создает пользователя, возвращает name, about, avatar и email.  
<br/>


```
POST /signin
```
зарегистрированному пользователю возвращает куку и ответ с name, about, avatar, email, id.  
<br/>


```
GET /signout
```
удаляет куку, в теле ответа прощается с пользователем.  
<br/>

#### Роуты, защищенные авторизацией:

```
GET /users/me
```
возвращает информацию о пользователе: name и email.  
<br/>


```
PATCH /users/me
```
обновляет name либо email, возвращает обновленные name и email.  
<br/>


```
GET /movies
```
возвращает все сохраненные пользователем фильмы.  
<br/>


```
POST /movies
```
создает в базе фильм с переданными пользователем полями nameEN, nameRU, country, director, duration, year, description, image, trailerLink, thumbnail.  
<br/>


```
DELETE /movies/:_id
```
удаляет указанный фильм из списка пользователя.  
<br/>

### Немного подробностей:
- схемы и модели созданы через Mongoose, поля валидируются,
- авторизация реализована через куки,
- все содержательные роуты защищены мидлварой,
- обращения к API валидируются через Joi и celebrate,
- пароль хешируется через bcrypt,
- запросы и ошибки логируются через Winston,
- сервер развернут на Я.Облаке.
<br/>

### Стек:
<img align="left" alt="JavaScript" title="javaScript" width="26px" src="https://github.com/Meniaylo/Meniaylo/blob/main/images/javascript.svg" />
<img align="left" alt="Node.js" title="Node.js" width="26px" src="https://github.com/Meniaylo/Meniaylo/blob/main/images/nodejs.svg" />
<img align="left" alt="Express" title="Express" width="26px" src="https://github.com/Meniaylo/Meniaylo/blob/main/images/express.svg" />
<img align="left" alt="MongoDB" title="MongoDB" width="26px" src="https://github.com/Meniaylo/Meniaylo/blob/main/images/mongodb.svg" />
<br/><br/><br/>

### Установка:
**npm install** – установить зависимости проекта.  
**npm run start** – запуск сервера.  
**npm run dev** – запуск сервера с hot reload.  
<br/>

### Что планирую улучшить:
попробовать перенести апи на какой-нибудь более бесплатный сервис, чем Яндекс.Облако.
<br/><br/>

### Ссылки:
сервер: api.meniaylo.nomorepartiesxyz.ru   
IP: 51.250.107.100
