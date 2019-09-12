# USE admin_service_db;
#
# CREATE TABLE users (
#     'id' INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
#     'login' VARCHAR(200) NOT NULL,
#     'password' VARCHAR(200) NOT NULL
# );
#
# CREATE TABLE issues (
#     'id' INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
#     'report_date' INT(10) NOT NULL,
#     'resolve_date' INT(10) NOT NULL,
#     'comment' VARCHAR(255),
#     'reporter' INT(10),
#     'resolver' INT(10)
# );