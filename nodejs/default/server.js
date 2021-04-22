const express = require('express');
const app = express();
const port = 3000

var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    //쿠키를 임의로 변조하는것을 방지하기 위한 sign 값 입니다.
    secret: '@#@$MYSIGN#@$#$', 
    //세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. 
    //express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
    resave: false,
    //uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미합니다. 
    //Documentation에서 이 값을 true로 설정하는것을 권장합니다.
    saveUninitialized: true
}));

var router = require('./router/main')(app, fs);