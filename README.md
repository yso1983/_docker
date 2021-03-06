# docker_mysql
mysql 설치 관련 명령어

### 기본 컨테이너 실행 명령어

```
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql8023 -v /Users/yongsoo/dbdata/mysql_data:/var/lib/mysql mysql:8.0.23 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

### MySql 접속 ,사용자를 생성 및 관리자 유저 생성 후 외부 접속

```
docker exec -it mysql8023 bash

mysql -u root -p

CREATE USER 'yso1983'@'%' IDENTIFIED BY '123456';

GRANT ALL PRIVILEGES ON *.* TO 'yso1983'@'%'; 
FLUSH PRIVILEGES;
```
