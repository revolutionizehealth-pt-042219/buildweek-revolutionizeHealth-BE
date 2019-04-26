# BuildWeek Revolutionize Health Backend

This is the backend for the Revolutionize Health Team Product.

## How To Log In

TODO

## Examples

POST /api/users/register
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

POST /api/users/login
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

GET /api/users/{username}

```javascript
{
    "username":"test1",
    "first_name":"Steve",
    "last_name":"Barker",
    "email":"test@test.com",
    "has_insurance":true,
    "insurance_name":"Harvard Pilgrim",
    "insurance_type":"State",
    "type":"patient"
}
```

TODO

# buildweek-revolutionizeHealth-FE
