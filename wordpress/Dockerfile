FROM wordpress:5.8.2-php8.0

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=2.1.12

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp

# Custom PHP config
COPY config/php.custom.ini /usr/local/etc/php/conf.d/php.custom.ini

RUN chown -R 1000:1000 /var/www/html
USER 1000:1000

# WordPress config
COPY wp-config.php /var/www/html/

# Install third party plugins with Composer
WORKDIR /var/www/html/wp-content
COPY composer.json ./
RUN composer install
WORKDIR /var/www/html

# Custom themes and plugins
COPY themes/ /var/www/html/wp-content/themes/
COPY plugins/ /var/www/html/wp-content/plugins/

CMD ["apache2-foreground"]