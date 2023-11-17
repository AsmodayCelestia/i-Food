

## Endpoints

List of Available Endpoints:

- `GET menu`
- `GET menu/:id`

- `POST /login`
- `POST /register` 
- `POST /googleLogin` 

- `POST /transactions`
- `POST /cart`
- `GET /cart`
- `PUT /payment`

======================================================
### GET /pub/articles

### Description

- Get All Menu Data

### Response

_200 - OK_

- Body

```json
  { 
  "message": "Read Success",
  "menu": [
    {
      "id": " Integer",
      "name": "String",
      "description": "String",
      "image": "String",
      "price": "Integer",
      "categoryId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    },
    ]
  }
      ```


========================================================
### GET /menu/:Id

### Description

- Get Specific Articles Data

### Response

_200 - OK_

- Body

```json
  { 
  "message": "Read Success",
  "article": [
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    },
    ]
  }
```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid Token"
  }
    OR
  {
    "message": "JsonWebTokenError"
  }
  ```

  _404- Not Found_

- Body
  ```json
  {
    "message": "Error Not Found"
  }
  ```
======================================
### POST /login

### Description

Login Admin Account

### Request

- Body

  ```json
  {
    "email": "String",
    "password": "String"
  }
  ```

#### Response

_201 - OK_
  ```json
  {
    "Authorization": "string",
    "message": "Login Success"
  }
  ```

_401 - Unauthorized_
  ```json
  {
    "message": "Email/Password can't be empty"
  }
  ```

_400 - Bad Request_
  ```json
  {
    "message": "Email/Password invalid"
  }
  ```

===============================
### POST /pub/register

### Description

Register New Staff Account

### Request

- Body

  ```json
  {
    "email": "String",
    "password": "String"
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "register success"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": "Email can't be null"
  }
  OR
  {
    "message": "Password can't be null"
  }
  OR
  {
    "message": "Email can't be empty"
  }
  OR
  {
    "message": "Password can't be empty"
  }
  OR
  {
    "message": "This email is already taken"
  }
  OR
  {
    "message": "Format email invalid"
  }

  ```

  _401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid Token"
  }
    OR
  {
    "message": "JsonWebTokenError"
  }
  ```

=============================
### POST /articles

### Description

- Add Articles 

### Request

- Body

  ```json
    {
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer"
    }
  ```

### Response

_201 - Created_

- Body

```json
  { 
  "message": "Add Articles Success",
  "article": [
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    },
    ]
  }
```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid Token"
  }
    OR
  {
    "message": "JsonWebTokenError"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": "Title can't be null"
  }
  OR
  {
    "message": "Title can't be empty"
  }
  OR
  {
    "message": "Content can't be null"
  }
  OR
  {
    "message": "Content can't be empty"
  }
  OR
  {
    "message": "Image can't be null"
  }
  OR
  {
    "message": "Image can't be empty"
  }
    OR
  {
    "message": "CategoryId can't be null"
  }
  OR
  {
    "message": "CategoryId can't be empty"
  }

  ```
=============================
### GET /articles

### Description

- Get All Articles Data

### Response

_200 - OK_

- Body

```json
  { 
  "message": "Read Success",
  "article": [
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    },
    ]
  }
      ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid Token"
  }
    OR
  {
    "message": "JsonWebTokenError"
  }
  ```

=================================================

### GET /articles/:id

### Description

- Get Specific Articles Data

### Response

_200 - OK_

- Body

```json
  { 
  "message": "Read Success",
  "article": [
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    },
    ]
  }
```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid Token"
  }
    OR
  {
    "message": "JsonWebTokenError"
  }
  ```

  _404- Not Found_

- Body
  ```json
  {
    "message": "Error Not Found"
  }
  ```
=============================================================
### PUT /articles/:id

### Description

- Update Article Data

### Request
- Body
    ```json
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "categoryId": "Integer",
      "authorId": "Integer"
    }
    ```

### Response

_200 - OK_

- Body
```json
  { 
  "message": "Update Success",
  "updateArticle": [
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    },
    ]
  }
```
_401 - Unauthorized_

- Body
    ```json
      {
        "message": "JsonWebTokenError"
      }
      OR
      {
        "message": "Invalid Token"
      }
    ```

_403- Forbidden_

- Body
  ```json
  {
    "message": "Forbidden"
  }
  ```

_404- Not Found_

- Body
  ```json
  {
    "message": "Error Not Found"
  }
  ```
=============================================================

### PATCH /articles/:id

### Description

- Update Article Image

### Request
- Body
    ```json
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "categoryId": "Integer",
      "authorId": "Integer"
    }
    ```

### Response

_200 - OK_

- Body
```json
  { 
  "message": "Update Image Success",
  "updateArticle": 
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    }
  }
```
_401 - Unauthorized_

- Body
    ```json
      {
        "message": "JsonWebTokenError"
      }
      OR
      {
        "message": "Invalid Token"
      }
    ```

_403- Forbidden_

- Body
  ```json
  {
    "message": "Forbidden"
  }
  ```

_404- Not Found_

- Body
  ```json
  {
    "message": "Error Not Found"
  }
  ```
=========================================================

### DELETE /articles/:id

#### Description

- Delete Specific Articles

#### Response

_200 - OK_

- Body
  ```json
  { 
  "message": "Delete Success",
  "updateArticle": 
    {
      "id": " Integer",
      "title": "String",
      "content": "String",
      "imgUrl": "String",
      "categoryId": "Integer",
      "authorId": "Integer",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    }
  }
  ```

_401 - Unauthorized_

- Body
    ```json
      {
        "message": "JsonWebTokenError"
      }
      OR
      {
        "message": "Invalid Token"
      }
    ```

_403- Forbidden_

- Body
  ```json
  {
    "message": "Forbidden"
  }
  ```

_404- Not Found_

- Body
  ```json
  {
    "message": "Error Not Found"
  }
  ```
========================================================

### DELETE /categories/:id

#### Description

- Delete Specific Category

#### Response

_200 - OK_

- Body
    ```json
      { 
        "message": "Delete Success"
      }
    ```

_401 - Unauthorized_

- Body
    ```json
      {
        "message": "JsonWebTokenError"
      }
      OR
      {
        "message": "Invalid Token"
      }
    ```

_404 -Not Found_

- Body
  ```json
  { 
    "message": "Error Not Found"
    
  }
  ```

_403 - Forbidden_

- Body

  ```json
  {
    "message": "Forbidden"
  }
  ```
===========================================================
### POST /categories

#### Description

- Add Specific Category

### Request
- Body
    ```json
    {
      "name": "String"
    }
    ```

#### Response

_200 - OK_

- Body
    ```json
      { 
        "message": "Add Category success"
      }
    ```

_401 - Unauthorized_

- Body
    ```json
      {
        "message": "JsonWebTokenError"
      }
      OR
      {
        "message": "Invalid Token"
      }
    ```
=================================================

### GET /categories

### Description

- Get All Category Data

### Response

_200 - OK_

- Body

```json
  { 
  "message": "Read Category Success",
  "category": [
    {
      "id": " Integer",
      "name": "String",
      "createdAt" : "Date",
      "updatedAt" : "Date"
    },
    ]
  }
```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid Token"
  }
    OR
  {
    "message": "JsonWebTokenError"
  }
  ```
==============================================================

### PUT /categories/:id

#### Description

- Delete Specific Category

#### Response

_200 - OK_

- Body
    ```json
      { 
        "message": "update success"
      }
    ```

_401 - Unauthorized_

- Body
    ```json
      {
        "message": "JsonWebTokenError"
      }
      OR
      {
        "message": "Invalid Token"
      }
    ```

_404 -Not Found_

- Body
  ```json
  { 
    "message": "Error Not Found"
    
  }
  ```

_403 - Forbidden_

- Body

  ```json
  {
    "message": "Forbidden"
  }
  ```
==============================================================

### DELETE /categories/:id

#### Description

- Delete Specific Category

#### Response

_200 - OK_

- Body
    ```json
      { 
        "message": "Delete Success"
      }
    ```

_401 - Unauthorized_

- Body
    ```json
      {
        "message": "JsonWebTokenError"
      }
      OR
      {
        "message": "Invalid Token"
      }
    ```

_404 -Not Found_

- Body
  ```json
  { 
    "message": "Error Not Found"
    
  }
  ```

_403 - Forbidden_

- Body

  ```json
  {
    "message": "Forbidden"
  }
  ```

### Global Error

#### Response

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
