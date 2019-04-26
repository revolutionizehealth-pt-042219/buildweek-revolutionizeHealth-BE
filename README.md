# BuildWeek Revolutionize Health Backend

This is the backend for the Revolutionize Health Team Product.

## How To Log In

TODO

## Examples

### POST /api/users/register

Accepts an object of schema

```javascript
{
	"username":"test1",
	"password":"test1",
	"first_name":"Steve",
	"last_name":"Barker",
	"email":"test@test.com",
	"has_insurance":true,
	"insurance_name":"Harvard Pilgrim",
	"type":"patient"
}
```

### POST /api/users/login

Accepts an object of schema

```javascript
{
    "username":"test1",
    "password":"test1",
}
```

201 (Success) Returns

```javascript
{
    "token":"Addddddddddddasd892329..."
}
```

401 (Error/unauthorized) Returns

```javascript
{
    "error":"Invalid Credentials"
}
```

### GET /api/users/{username}

Requires user to be logged in and have a token

```javascript
{
    "id":1,
    "username":"test1",
    "first_name":"Steve",
    "last_name":"Barker",
    "email":"test@test.com",
    "has_insurance":true,
    "insurance_name":"Harvard Pilgrim",
    "type":"patient"
}
```

### PUT /api/users/{id}

Requires user to be logged in

Accepts an object like the example to update the user

```javascript
{
	"id":1,
	"username":"test1",
	"first_name":"Steve",
	"last_name":"Barker",
	"email":"test@test.com",
	"has_insurance":true,
	"insurance_name":"Harvard Phlem",
	"type":"patient"
}
```

200 (Success) Returns Updated user info object

400 (Bad Request) Returns

```javascript
{
    "error":"Malformed request. Make sure object is formatted correctly"
}
```

TODO

# buildweek-revolutionizeHealth-FE
