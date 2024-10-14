## M&M Restaurant 

---
###### เป็นเว็บไซต์ที่ให้บริการข้อมูลเกี่ยวกับเมนูอาหาร การลงทะเบียนผู้ใช้ และการจัดการเมนูโดยสามารถทำการสั่งซื้ออาหารได้อย่างสะดวกสบาย
### env guide
PORT=3000

DATABASE_URL="mysql://u:pw@localhost:3306/project-restaurant"

JWT_SECRET

CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

---
## API Documentation
### Endpoint http://localhost:3000/auth

|  Name  |Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Register|post|/register|-|-|-|{firstname,lastname,phonenumber,address,email,password ,confirmPassword}
|Login|post|/login|-|-|-|{ email, password }
|Check User Role|post|/current-user|Y|-|-|-
|Forget password|post|/forget-password|-|-|-|{ email }
|Reset password|post|/reset-password/:token|Y|-|-|{ password }

### Endpoint http://localhost:3000/user
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Show Profile User|get|-|Y|-|-|-|
|Edit Profile User|patch|/edit-profile/:userId|Y|Y|-|{ firstname, lastname, phonenumber, address, email }

### Endpoint http://localhost:3000/menu
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Show all Menu|get|/allmenu|-|-|-|-|
|Show Category Main |get|/main-menu|-|-|-|-|
|Show Category Salad |get|/salad-menu|-|-|-|-|
|Show Category Snack |get|/snack-menu|-|-|-|-|
|Show Category Beverage|get|/beverage-menu|-|-|-|-|
|Show Popular Menu|get|/popular|-|-|-|-|

### Endpoint http://localhost:3000/comment
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Show order success|get|/user/:customerId|-|Y|-|-|
|Create comment|post|-|Y|-|-|{ comments }|
|Show comment on page|get|/show-comment|-|-|-|-|

### Endpoint http://localhost:3000/admin/manage
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Show All Menu|get|/allmenu|-|-|-|-|
|Get category name for create menu|get|/getCategoryName|-|-|-|-|
|Admin create Menu|post|/create-menu|-|-|-|{menuName,image,
price,description,categoryId} |
|Admin edit Menu|patch|/edit-menu/:menuId|Y|Y|-|{menuName,price,description} |
|Admin delete Menu|delete|/delete-menu/:menuId|Y|Y|-|-|

### Endpoint http://localhost:3000/cart
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Create cart |post|-|-|-|-|{ customerId, items } |
|Show detail cart |get|/get-cart/:userId|-|Y|-|-|
|Update cart |patch|/update-cart_item/:cartItemId|-|Y|-|{ count, price } |
|delete cart|delete|/delete-cart_item/:cartItemId|-|Y|-|-|

### Endpoint http://localhost:3000/order
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Payment|post|/confirm-payment|-|-|-|{ customerId }|
|Show Dashboard Order|get|/dashboard|-|-|-|-|
|Admin show al order|get|-|-|-|-|-|
|Admin update status order|put|/update/:orderId|-|Y|-|{ status }|
|Admin delete order|delete|/delete/:orderId|-|Y|-|-|

### Endpoint http://localhost:3000/admin/report
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Show report comment|get|/all-comment|-|-|-|-|
|Show report menu unit|get|/menu-unit|-|-|-|-|

### Endpoint http://localhost:3000/admin/setting
|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Admin show all user|get|/show-user|-|-|-|-|
|Admin edit user|put|/edit-user/:userId|-|Y|-|{ newRole }|
|Admin delete user|delete|/delete-user/:userId|-|Y|-|-|
---
## Note







