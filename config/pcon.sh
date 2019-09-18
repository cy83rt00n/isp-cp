#!/bin/bash
set -eo pipefail

case $1 in
dbdump)
  docker-compose exec mariadb mysqldump -uroot -psecret -B admin_service_db | gzip -c >./database/mysql/0-latest.sql.gz
  ;;
db)
  docker-compose exec mariadb mysql -uroot -psecret admin_service_db
  ;;
yarn)
  docker-compose exec react yarn $2 $3
  ;;
install)
  docker-compose exec php php app/cli.php installation
  ;;
dc-start)
  docker-compose up -d
  ;;
dc-down)
  docker-compose down -v
  ;;
dc-restart)
  docker-compose down -v && docker-compose up -d
  ;;
full-restart)
  docker-compose down --rmi all -v --remove-orphans && docker-compose up -d --build
  ;;
ahost-add)
  ip=${2:-127.0.0.1}
  domain=${3:-$(basename $(pwd)).loc}
  project=${4:-$(basename $(pwd))}
  echo "${ip}	${domain}	#${project} ahost-auto-assigned-value" >>/etc/hosts
  ;;
ahost-del)
  project=${2:-$(pwd).loc}
  sed -i "/#${project}/d" /etc/hosts
  ;;
ahost-dal)
  sed -i "/ahost-auto-assigned-value/d" /etc/hosts
  ;;
*)
  echo "
Project control script.
Usage:
  ./pcon dbdump       - creates project database dump from mariadb service container in ./database/mysql/0-latest.sql.gz
  ./pcon db           - login into database service contaienr with uroot
  ./pcon yarn \$2 \$3 - launch yarn inside react service container with two optional parameters
  ./pcon install      - runs installation task from phalcon cli script
  ./pcon dc-(start|down|restart)  - starts,stops,restarts containers
  ./pcon dc-full-restart          - restarting containers with removing images,volumes on stop and build on start
"
  ;;
esac
