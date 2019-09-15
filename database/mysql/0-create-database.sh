#!/bin/bash

# Create table if not exists
mysql -uroot -psecret -e "CREATE DATABASE IF NOT EXISTS $project_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_bin"