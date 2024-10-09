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
### Endpoint

|Name|Method |Path |Authen | Params | Query | Body |
|:----: |:----:|:----:|:----:  |:----:|:----:|:----: |
|Register|post|/auth/register|-|-|-|{firstname,lastname,phonenumber,address,email,password ,confirmPassword}
|Login|post|/auth/login|-|-|-|{ email, password }
|Current User|post|/auth/current-user|Y|-|-|-
|Show Profile User|get|/user|Y|-|-|-|
|Edit Profile User|patch|/user/edit-profile/:userId|Y|Y|-|{ firstname, lastname, phonenumber, address, email }
|Show all Menu|get|/menu/allmenu|-|-|-|-|
|Show Category Main Menu|get|/menu/main-menu|-|-|-|-|
|Show Category Salad Menu|get|/menu/salad-menu|-|-|-|-|
|Show Category Snack Menu|get|/menu/snack-menu|-|-|-|-|
|Show Category Beverage Menu|get|/menu/beverage-menu|-|-|-|-|
|Admin show all Menu|get|/admin/allmenu|-|-|-|-|
|Admin create Menu|post|/admin/allmenu|-|-|-|{menuName,image,price,description,categoryId} |
|Admin edit Menu|patch|/admin/edit-menu/:menuId|Y|Y|-|{menuName,price,description} |
|Admin delete Menu|delete|/admin/delete-menu/:menuId|Y|Y|-|-|



---
## Note







