FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

RUN apk update \
    && apk add bash libpng-dev zlib freetype-dev libjpeg-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg

RUN docker-php-ext-install pdo pdo_mysql gd exif fileinfo