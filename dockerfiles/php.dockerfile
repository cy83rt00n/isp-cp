FROM php:7.2-fpm

ARG PHALCON_VERSION=3.4.4
ARG PHALCON_EXT_PATH=php7/64bits

    # Update linux distro
RUN apt-get update && \
    # Install pdo_pgsql requirements
    apt-get install -y libpq-dev && \
    set -xe && \
    # Installing PDO MySQL and PostgreSQL drivers
    docker-php-ext-install pdo_mysql pdo_pgsql && \
    # Compile Phalcon
    curl -LO https://github.com/phalcon/cphalcon/archive/v${PHALCON_VERSION}.tar.gz && \
    tar xzf ${PWD}/v${PHALCON_VERSION}.tar.gz && \
    docker-php-ext-install -j $(getconf _NPROCESSORS_ONLN) ${PWD}/cphalcon-${PHALCON_VERSION}/build/${PHALCON_EXT_PATH} && \
    # Remove all temp files
    rm -r \
        ${PWD}/v${PHALCON_VERSION}.tar.gz \
        ${PWD}/cphalcon-${PHALCON_VERSION} && \
    # Installing phalcon-devtools
    apt-get install -y git && \
    cd /tmp && \
    git clone https://github.com/phalcon/phalcon-devtools.git /opt/phalcon-devtools && \
    cd /opt/phalcon-devtools && \
    ln -s $(pwd)/phalcon /usr/bin/phalcon && \
    chmod ugo+x /usr/bin/phalcon


CMD ["php-fpm","-F"]