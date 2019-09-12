#!/bin/bash

# Create table if not exists
mysql -uroot -psecret -e "CREATE DATABASE IF NOT EXISTS $project_database_name"