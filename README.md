# BuildWeek Revolutionize Health Backend

This is the backend for the Revolutionize Health Team Product.

## How To Log In

TODO

## Examples

### POST /api/users/register

`https://buildweek-revo-health-be.herokuapp.com/api/users/register`
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

OR without insurance

```javascript
{
	"username":"test5",
	"password":"test5",
	"first_name":"Steve",
	"last_name":"Barker",
	"email":"test@test.com",
	"has_insurance":false,
	"type":"patient"
}

```

### POST /api/users/login

`https://buildweek-revo-health-be.herokuapp.com/api/users/login`
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

### GET /api/users/{id}

`https://buildweek-revo-health-be.herokuapp.com/api/users/1`
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

`https://buildweek-revo-health-be.herokuapp.com/api/users/1`

If user does not exist you will get an error.
Requires user to be logged in, requires the user have
the same id as the req

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

### DELETE /api/users/{id}

`https://buildweek-revo-health-be.herokuapp.com/api/users/1`

If user does not exist you will get an error.
Requires user to be logged in, requires the user have
the same id as the req

200 (Success) Returns

```javascript
{
  "message": "Successfully Deleted"
}
```

400 (Bad Request) Returns

```javascript
{
  error: "User Does not exist";
}
```

### POST /api/procedures/

`https://buildweek-revo-health-be.herokuapp.com/api/procedures`

Requires user to be logged in to post a procedure

Accepts Object schema of

```javascript
{
	"user_id":1,
	"procedure_name":"tonsillectomy",
	"hospital_name":"Mercy Hospital",
	"city":"Pine Bluff",
	"state":"AR",
	"zip":71601,
	"street":"2300 S Olive St",
	"doctor_name":"Dr. Smithington",
	"procedure_cost":2000,
	"insurance_payment":1500,
	"insurance_adjustment":200,
	"out_of_pocket":300,
	"anonymous":false
}
```

or

```javascript
{
	"user_id":1,
	"procedure_name":"tonsillectomy",
	"hospital_name":"Mercy Hospital",
	"city":"Pine Bluff",
	"state":"AR",
	"zip":71601,
	"street":"2300 S Olive St",
	"doctor_name":"Dr. Smithington",
	"specialization":"lobotomies",
	"procedure_cost":2000,
	"insurance_payment":1500,
	"insurance_adjustment":200,
	"out_of_pocket":300,
	"anonymous":false
}
```

### GET /api/procedures/

Does not need to be logged in to get all procedures

`https://buildweek-revo-health-be.herokuapp.com/api/procedures`

# buildweek-revolutionizeHealth-FE
