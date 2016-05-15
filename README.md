## WebApp
Create a WebApp for Merchants to enter coupon details and expiry date. Submit this to the respective API for persistence.

Use Cases:
1. Submit new coupon to DB via web form
2. Submit new coupon to DB via API
3. Visualize coupon usage

### Working

This is a mock app which connects to the "opiniothon API" to get live analytics of the coupon consupmtion by the user for a given merchant.
Each merchant requires to login to the system to visualize the coupons that have more traction. 

Coupon data are stored based on the time of consumption and also the location of consupmtion make it easier for the merchants to target specific users
It also provide option for the merchants to input new Coupons to the "opiniothon API" so that the users will be provided properly channelized notifications regarding the Coupons through our Android App.

### Data Structure - Array of Coupons submitted to API
```
{
    "merchantId1": {
        "merchantName": "Free Food",
        "coupons": [{
            "coupon": "BEER20",
            "discount": 25,
            "type": "percent",
            "validity": "Sun May 15 2016 05:05:25 GMT+0530 (IST)",
            "description": "Get Your beer at some discount"
        }, {...}]
    }
    "merchantId2": {...}
}
```

## DataViz
Create vizualisations to assist merchants in making data driven decisions about individual promotions and stores.

### Data Structure - Array of Coupon Usage fetched from API
```
{
    "merchantId1": {
        "merchantName": "Free Food",
        "couponUsage": {
            "BUR25": {
                "users": [{
                    "id": "uid141",
                    "date": "Sun May 15 2016 07:45:11 GMT+0530 (IST)",
                    "location": "LOC1"
                }, {
                    "id": "uid111",
                    "date": "Sun May 15 2016 10:41:19 GMT+0530 (IST)",
                    "location": "LOC1"
                }]
            }
        }
    }
}
```
