#아파치 이미지 및 세팅 

영구 데이터에 대한 도커 볼륨을 만듭니다.
docker volume create apache-data

영구 데이터 디렉터리 확인합니다.
docker volume inspect apache-data

명령 출력은 다음과 같습니다.
[
    {
        "CreatedAt": "2020-09-18T19:48:28Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/apache-data/_data",
        "Name": "apache-data",
        "Options": {},
        "Scope": "local"
    }
]
선택적으로 더 쉬운 액세스 위치에 대한 기호 링크를 만듭니다.
ln -s /var/lib/docker/volumes/apache-data/_data /apache

영구 데이터 저장소를 사용하여 아파치 컨테이너를 시작합니다.
docker run -d --name apache -p 8080:8080 -v apache-data:/usr/local/apache2/htdocs httpd

영구 데이터 디렉터리의 내용을 확인합니다.
ls /var/lib/docker/volumes/apache-data/_data

명령 출력은 다음과 같습니다.
index.html