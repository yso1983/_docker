강좌 : https://velopert.com/332

docker run -dt --mount type=bind,source=`pwd`,target=/app \
-p 3000:3000 -h node --name node node:latest

```
docker exec -it node /bin/bash
> cd app && npn init 

> npm install express

```