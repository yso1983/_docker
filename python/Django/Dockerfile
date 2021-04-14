#docker build --no-cache --network=host -t django_web .
#docker run -it --net host --name django_web django_web /bin/bash
FROM ubuntu:18.04

WORKDIR /app

COPY . /app
COPY requirements.txt ./

RUN apt-get update
RUN apt-get install -y python3 python3-pip 
#RUN apt-get install -y python3-dev build-essential
#RUN apt-get install -y net-tools 
#RUN apt-get install -y dnsutils
RUN pip3 install -r requirements.txt

EXPOSE 8000 
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
#RUN django-admin startproject mysite .
