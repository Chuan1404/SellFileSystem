# Hệ thống giao dịch hình ảnh điện tử
## 1. Giới thiệu
Hệ thống giao dịch hình ảnh điện tử là một hệ thống giúp người dùng có thể thương mại hóa các file ảnh của chính mình. Hiện nay, trên thị trường có rất nhiều hệ thống giao dịch điện tử đa phương tiện lớn khác như pixabay, shutterstock,... nhưng những hệ thống kể trên hướng về quốc tế nên việc sử dụng và giao dịch trở nên hơi phức tạp với nhiều người Việt Nam. Nên hệ thống này cung cấp môi trường giao dịch cho bộ phận người Việt và phục vụ nhu cầu của người Việt. 
## 2. Công nghệ được sử dụng
* Spring boot
* React: React-Redux, React-Redux-Saga
* MySQL
* Amazon S3
## 3. Tình trạng dự án
Hiện tại, hệ thống chưa được hoàn thiện và chưa sẵn sàng để deploy. Sau đây tôi sẽ trình bày các tính năng hệ thống đã có và những tính năng dự định trong tương lai.
### 3.1. Những tính năng đã có
- Hỗ trợ định dạng file: JPG, PNG
- Kiểm tra và giải nén kích thước ảnh (Ví dụ: Chuyển ảnh kích thước 6000x4000 thành 1920x1280)
- Tương tác với Amazon S3 (Thêm, sửa xóa các file)
- Xác thực tài khoản google
#### 3.1.1. Client
- Hỗ trợ đăng nhập và đăng kí bằng tài khoản google
- Các chức năng cơ bản của hệ thống bán hàng như xem chi tiết sản phẩm, phân trang, thêm vào giỏ hàng,...
- Thanh toán bằng Momo
#### 3.1.2. Admin
- Quản lý tài khoản (thêm, sửa, xóa)
- Quản lý các file (thêm, sửa, xóa)
### 3.2. Những tính năng trong tương lai
- Thêm chức năng bán ảnh cho người dùng
- Chat giữa người dùng và tư vấn viên
- Gửi mail
- Áp dụng AI trong tìm kiếm hình ảnh
- Hỗ trợ nhiều định dạng file hơn như MP3, MP4, ...

