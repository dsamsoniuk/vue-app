FROM php:8.2-fpm

RUN pecl install xdebug
RUN docker-php-ext-enable xdebug

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN apt-get update && apt-get install -y git

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions @composer-2.6.6 xdebug-3.2.2 zip pdo_mysql \
    intl 

RUN apt-get update && apt-get install -y software-properties-common npm
RUN npm install npm@10.8.2 -g &&  npm install n -g 

RUN apt-get install -y ffmpeg

RUN apt-get -y update \
&& apt-get install -y libicu-dev \
&& docker-php-ext-configure intl \
&& docker-php-ext-install intl

# RUN useradd -ms /bin/bash www-data 
# USER www-data
RUN usermod -u 1000 www-data

WORKDIR /var/www/html
