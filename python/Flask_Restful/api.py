# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flaskext.mysql import MySQL

app = Flask(__name__)
api = Api(app)

# MySQL 연결
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'yso1983'
app.config['MYSQL_DATABASE_PASSWORD'] = '123456'
app.config['MYSQL_DATABASE_DB'] = 'test'
app.config['MYSQL_DATABASE_HOST'] = '172.24.0.3'  #도커 내부 ip
mysql.init_app(app)

class CreateUser(Resource):
    def get(self):
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute('''SELECT user_id, email, username, password FROM user''')
        data = cursor.fetchall()

        result = {}
        for item in data :
            result[item[0]] = item
        return result

    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str)
            parser.add_argument('user_name', type=str)
            parser.add_argument('password', type=str)
            args = parser.parse_args()

            #_userEmail = args['email']
            #_userName = args['user_name']
            #_userPassword = args['password']
            #return {'Email': args['email'], 'UserName': args['user_name'], 'Password': args['password']}
            _userEmail = args['email']
            _userName = args['user_name']
            _userPassword = args['password']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_create_user', (_userEmail, _userName, _userPassword))
            data = cursor.fetchall()

            if len(data) is 0:
                conn.commit()
                return {'StatusCode': '200', 'Message': 'User creation success'}
            else:
                return {'StatusCode': '1000', 'Message': str(data[0])}
        except Exception as e:
            return {'error': str(e)}

api.add_resource(CreateUser, '/user')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')