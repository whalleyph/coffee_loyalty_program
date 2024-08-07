# Coffee Membership Backend App

# Prerequisites

yarn
node.js

# Startup

Install dependencies: `yarn`
Open api server: `yarn dev`

# Endpoints

GET /api/coffeeData/ to look at all coffee members
POST /api/coffeeData/ to add a new member with not stamps or redeemable free cofees
PUT /api/coffeeData/addStamp/:id Add a stamp to specific member by id
PUT /api/coffeeData/redeemFreeCoffee/:id reduce free coffees by 1 but not less than 0

# Typical API Response Body

```
[
    {
        "id": "string",
        "name": "string",
        "stamps": "number",
        "freeCoffees": "number"
    }
]
```
