REST API specification:

methods:
1./auth:
request: POST /register {body:{email, password}}
response: 200 if ok, 401 if failed

request: POST /login {body:{email, password}}
reponse: 200 if ok, 401 if failed

request: GET /logout
respone: 200