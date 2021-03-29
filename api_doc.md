# My Fancy Todos App Server

My Todos App is an application to manage your todos. This ap has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

### RESTful endpoints list

- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

&nbsp;

## RESTful endpoint

### GET /todos

> Get all todos

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - Ok)_

```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2021-03-29T12:15:35.763Z",
    "updatedAt": "2021-03-29T12:15:35.763Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2021-03-29T12:15:35.763Z",
    "updatedAt": "2021-03-29T12:15:35.763Z",
  }
]
```

_Response (500 - Internal server error)_

```
{
  "message": "Internal server error"
}
```

---

### POST /todos

> Post new Todos / Create Todo

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "title": "<todo name>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (201 - Created)_

```
    {
        "id": 3,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status",
        "due_date": "<todo due date>",
        "updatedAt": "2021-03-29T16:20:26.926Z",
        "createdAt": "2021-03-29T16:20:26.926Z"
    }

```

_Response (400 - Bad Request)_

```
    {
        "message": "notNull Violation: Todo.<key> cannot be null"
    }

```

_Response (500 - Internal server error)_

```

{
"message": "Internal server error"
}

```

---

### GET /todos/:id/

> Get selected Todos

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "id": <id of the todo to get>
}
```

_Response (200 - Ok)_

```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_

```
{
  "message": "Not Found"
}
```

---

### PUT /todos/:id/

> Update selected Todos

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "title": "<title to get update>"
    "description": "<description to get update into>",
    "status": "<status to get update into>",
    "due date": "<due date to get update into>",
}
```

_Response (200 - Ok)_

```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Validation error: Please enter your <key>"
}

```

_Response (404 - Not Found)_

```
{
     "message": "Not Found"
}
```

_Response (500 - Internal server error)_

```
{
     "message": "Internal server error"
}
```

---

### PATCH /todos/:id/

> UPDATE selected Todos

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "status": "<status to get update into>",
}
```

_Response (200 - Ok)_

```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo new status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Validation error: Please enter your <key>"
}

```

_Response (404 - Not Found)_

```
{
     "message": "Not Found"
}
```

_Response (500 - Internal server error)_

```
{
     "message": "Internal server error"
}
```

---

### DELETE /todos/:id/

> Delete selected Todos

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
     "id": <id of the todo to delete>
}
```

_Response (200 - Ok)_

```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_

```
{
     "message": "Not Found"
}
```

_Response (500 - Internal server error)_

```
{
     "message": "Internal server error"
}
```

---
