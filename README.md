# docker_mysql
mysql 설치 관련 명령어

### 기본 컨테이너 실행 명령어

₩₩₩
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql -v /Users/yongsoo/mysql_data:/var/lib/mysql mysql:8.0.23 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
₩₩₩

