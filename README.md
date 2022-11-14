# BUILD API NESTJS



## ES7


# SETTING
1. Cấu hình .env như file mẫu .env.example
2. Trỏ domain vào folder/dist
3. Run npm start:dev
   `pm2 start dist/main.js --name "nestjs-api"`


/var/www/duan/nestjs-api-ecm



https://gist.github.com/stancl/cab04a411f136047e80c1de81528eb23 

- Danh mục
  - Top danh mục
  - Danh mục nổi bật 
- Sản phm
  - Sản phẩm giảm giá



percent|money

## Công thức tính tiền ở giỏ hàng
`{
"name" : "Phan Trung Phú",
"phone" : "0986420994",
"address" : "Quỳnh ngọc - Quỳnh Lưu Nghệ AN",
"note" : "Không có gì",
"total_price" : 500000,
"products": [
{
"id" : 2,
"name" : "Sản phẩm 1",
"quantity" : 2,
"discount" : 5,
"price" : 250000,
"total_price" : 200000
}
]
}`

Tổng tiền đơn hàng = tổng các total_price của từng item


https://typeorm.io/find-options




server {
    listen 80;
    listen [::]:80;

    root /var/www/duan/nestjs-api-ecm/dist; 
    index index.html index.htm index.nginx-debian.html; 

    server_name api-ecm.123code.net www.api-ecm.123code.net; 
 
    location / { 
        try_files $uri $uri/ =404; 
        proxy_pass http://localhost:3006/;
    } 
} 
