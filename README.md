# URL Shortener Microservice

### This is the 3th project to obtain the FreeCodeCamp certification

#

This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at

https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

![UrlShortner](https://res.cloudinary.com/dulwtefos/image/upload/v1676232927/fcc-backend/project3_zk5b6d.jpg)

&nbsp;

## [View Demo](https://boilerplate-project-urlshortener.onrender.com/)

&nbsp;

### How Work

- Require Node.js version 16.15

1. Clone the project
2. `npm install` - for install dependency
3. `npm run dev` - for run development enviroment
4. `npm run start` - for run production enviroment

### Features

- The project was used express framework

- To add persistence, mongodb was used as the NoSql database and mongoose as the database manager

- Ando used body-parser for get data input text type

### Used

- When your type a valid URL exist or not in database

`{ "original_url": "https://www.google.com", "short_url": 1 }`

-Wen yor type not valid URL

`{ "error": "Invalid URL" }`

-When your type valir URL but host not exist

`{ "error": "Invalid Hostname" }`

- For test respond server from URL

-If the url exist in database

https://boilerplate-project-urlshortener.onrender.com/api/shorturl/1

`You will be redirected to the website`

-If not num format in URL

https://boilerplate-project-urlshortener.onrender.com/api/shorturl/abcdfghijklm

`{ "error": "Wrong format" }`

-If num short url not exist in database

https://boilerplate-project-urlshortener.onrender.com/api/shorturl/100000000000

`{ "error": "No short URL found for the given input" }`

&nbsp;

### License MIT
