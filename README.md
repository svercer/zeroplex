<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Start Zeroplex Laravel App

## Install Docker on your machine
If you dont wanna use docker run everyting with php instead of sail and remove sail up command
### clone the repository

### Run following commands in order

```composer install```
Make a Copy from .env.example to .env using following command
```cp .env.example .env```

Then Set env variables for mysql in the .env file 

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=zeroplex
DB_USERNAME=sail
DB_PASSWORD=password
```

```sail up -d```

flag -d is detach mode so you can continue using same terminal


### Generate application key by running this command
```sail artisan key:generate```


Run npm commands 
```npm install```
```npm run dev```


```sail artisan migrate:refresh --seed```


## Jobs

to run the job that sends info about the due jobs 
run this command in one terminal and let it open

```sail artisan queue:work --queue=tasks,emails```

and then in other terminal run 

```sail artisan tinker```

then run 

```Artisan::call(task:expiration)```




