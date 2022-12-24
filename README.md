# BUILD API NESTJS



## ES7


# SETTING
1. Cấu hình .env như file mẫu .env.example
2. Trỏ domain vào folder/dist
3. Run npm start:dev
   `pm2 start dist/main.js --name "nestjs-api"`

   


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
