# BUILD API NESTJS



## ES7


# SETTING
1. Cấu hình .env như file mẫu .env.example
2. Trỏ domain vào folder/dist
3. npm run start:dev
   `pm2 start dist/main.js --name "nestjs-api"`

   


https://typeorm.io/find-options



Kính gửi anh/chị,
VNPAY xin gửi anh/chị thông tin kết nối vào môi trường test của Cổng thanh toán VNPAY:
Xin lưu ý:
Thông tin dưới đây là môi trường Sandbox của VNPAY, sử dụng để kết nối kiểm thử hệ thống. Merchant không sử dụng thông tin này để đưa ra cho khách hàng thanh toán thật.

Merchant cần tạo địa chỉ IPN (server call server) sử dụng cập nhật tình trạng thanh toán (trạng thái thanh toán) cho giao dịch. Merchant cần gửi cho VNPAY URL này.

Thông tin cấu hình:
Terminal ID / Mã Website (vnp_TmnCode): 3RDGQAX3

Secret Key / Chuỗi bí mật tạo checksum (vnp_HashSecret): PMSBQTYJIQLJILQTWHKAESOMMTXYHFHE

Url thanh toán môi trường TEST (vnp_Url): https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

Thông tin truy cập Merchant Admin để quản lý giao dịch:
Địa chỉ: https://sandbox.vnpayment.vn/merchantv2/

Tên đăng nhập: jefaj40700@jobsfeel.com

Mật khẩu: (Là mật khẩu nhập tại giao diện đăng ký Merchant môi trường TEST)

Kiểm tra (test case) – IPN URL:
Kịch bản test (SIT): https://sandbox.vnpayment.vn/vnpaygw-sit-testing/user/login

Tên đăng nhập: jefaj40700@jobsfeel.com

Mật khẩu: (Là mật khẩu nhập tại giao diện đăng ký Merchant môi trường TEST)

Tài liệu:
Tài liệu hướng dẫn tích hợp: https://sandbox.vnpayment.vn/apis/docs/gioi-thieu/

Code demo tích hợp: https://sandbox.vnpayment.vn/apis/vnpay-demo/code-demo-tích-hợp

Thẻ test:
Ngân hàng	NCB
Số thẻ	9704198526191432198
Tên chủ thẻ	NGUYEN VAN A
Ngày phát hành	07/15
Mật khẩu OTP	123456

Ngoài ra anh/chị có thể dùng thử demo Cổng thanh toán VNPAY tại: https://sandbox.vnpayment.vn/apis/vnpay-demo/để có những trải nghiệm đầu tiên khi tích hợp với Cổng thanh toán VNPAYQR.
Cần thêm thông tin, anh/chị có thể trao đổi trực tiếp với em qua thông tin ở phần chữ ký của email này.
Cảm ơn anh/chị.
Mọi thắc mắc và góp ý, xin vui lòng liên hệ với chúng tôi qua:
Email: support.vnpayment@vnpay.vn
Hotline: 1900 55 55 77

Trân trọng,

*Quý khách vui lòng không trả lời email này*



"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Version=2.1.0&vnp_Command=pay&vnp_TmnCode=3RDGQAX3&vnp_Locale=vn&vnp_CurrCode=VND&vnp_TxnRef=124&vnp_OrderInfo=Thanh+to%C3%A1n&vnp_OrderType=other&vnp_Amount=23500000&vnp_ReturnUrl=https%3A%2F%2F123code.net&vnp_IpAddr=%3A%3Affff%3A127.0.0.1&vnp_CreateDate=202314Su121406"
