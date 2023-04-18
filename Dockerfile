# Laravel Dockerfile

# 1. Set the base image
FROM php:7.4-fpm

# 2. Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    unzip

# 3. Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 4. Install Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# 5. Set the working directory
WORKDIR /app

# 6. Copy the application
COPY . /app

# 7. Install the application's dependencies
RUN composer install
