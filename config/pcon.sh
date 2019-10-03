#!/bin/bash
set -eo pipefail

. "$(pwd)/.env"

case $1 in
dbdump)
  docker-compose exec mariadb mysqldump -uroot -psecret -B ${DB_NAME} | gzip -c >./database/mysql/0-latest.sql.gz
  ;;
db)
  docker-compose exec mariadb mysql -uroot -psecret ${DB_NAME}
  ;;
yarn)
  docker-compose exec react yarn $2 $3
  ;;
build-prod)
  sed -sri 's/^#?(.+command:)/\1/' docker-compose.override.yml
  find react/src/ -type f -exec readlink -f {} \; | xargs sed -is 's/loc.onedext.ru/ispcp.onedext.ru/'
  rm -Rfv react/build/* && docker-compose exec react yarn build && sudo chown -Rf 33:1000 react/build/ && sudo chmod -R 774 react/build/ && git add . && git commit -m "prod build"
  sed -sri 's/^#?(.+command:)/#\1/' docker-compose.override.yml
  find react/src/ -type f -exec readlink -f {} \; | xargs sed -is 's/ispcp.onedext.ru/ctn.onedext.ru/'
  ;;
dev-conf)
  sed -sri 's/^#?(.+command:)/#\1/' docker-compose.override.yml
  find react/src/ -type f -exec readlink -f {} \; | xargs sed -is 's/ispcp.onedext.ru/ctn.onedext.ru/'
  ;;
install)
  docker-compose exec php php app/cli.php installation
  ;;
dc-start)
  docker-compose up -d
  ;;
dc-stop)
  docker-compose down -v
  ;;
dc-restart)
  docker-compose down -v && docker-compose up -d
  ;;
dc-full-restart)
  docker-compose down --rmi all -v --remove-orphans && docker-compose up -d --build
  ;;
ahost-add)
  ip=${2:-127.0.0.1}
  domain=${3:-${PROJECT_DOMAIN}}
  project=${4:-${PROJECT_NAME}}
  echo "${ip}	${domain}	#${project} ahost-auto-assigned-value" >>/etc/hosts
  ;;
ahost-del)
  project=${2:-${PROJECT_NAME}}
  sed -i "/#${project}/d" /etc/hosts
  ;;
ahost-dal)
  sed -i "/ahost-auto-assigned-value/d" /etc/hosts
  ;;
*)
  echo "
Project control script.
Usage:
  ./pcon dbdump                       - creates project database dump from mariadb service container in ./database/mysql/0-latest.sql.gz
  ./pcon db                           - login into database service contaienr with uroot
  ./pcon yarn \$2 \$3                 - launch yarn inside react service container with two optional parameters
  ./pcon install                      - runs installation task from phalcon cli script
  ./pcon dc-(start|down|restart)      - starts,stops,restarts containers
  ./pcon dc-full-restart              - restarting containers with removing images,volumes on stop and build on start
  ./pcon ahost-add ip domain project  - generates record in /etc/hosts as \"ip domain #project ahost-auto-assigned-value\"
  ./pcon ahost-del project            - deletes records from /etc/hosts where project match \"ip domain #project ahost-auto-assigned-value\"
  ./pcon ahost-dal                    - deletes all \" .* ahost-auto-assigned-value\" records
"
  ;;
esac
