장고 문서 : https://docs.djangoproject.com/ko/3.2/

#첫 실행 명령으로 설정파일 생성한다.
>django-admin startproject mysite .

#ip 설정
```
# dockerdjango/settings.py
ALLOWED_HOSTS = ['127.0.0.1']
```

#docker 컨테이너 접속 후 아래에서 명령 사용하자(ex)
```
bash -c "python3 manage.py startapp polls"
python3 manage.py makemigrations polls
```

#앱 설치 관련
- 참고 django-polls 폴더

1.설치
```
python -m pip install --user django-polls/dist/django-polls-0.1.tar.gz
```
2.삭제
```
python -m pip uninstall django-polls
```