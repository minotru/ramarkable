models:
* User: {\
    login: String,\
    password: String 
}

Note fields:
1. id
2. content
3. createdAt - date
4. updatedAt- date
5. authorId
6. name
7. type - "folder" | "note"
8. parentFolderId

REST API specification:

methods:
1. /auth:\
* request: POST /register {body:{email, password}}\
response: 200 if ok, 401 if failed

* request: POST /login {body:{email, password}}\
reponse: 200 if ok, 401 if failed\

* request: GET /logout\
respone: 200
2. /notes: 
    * request: GET /  \
      response: root folder notes (see **note** description below)

    * request: GET /?id=<id_1>,...,id=<id_n>\
      response: array of requested notes (if some notes can not be requested, they will be omitted)

    * request: POST /create\
      params: 
        * type: "folder" | "note", required
        * content: string, optional
        * name: string, optional
        * 




