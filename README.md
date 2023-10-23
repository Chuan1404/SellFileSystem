# Hệ thống giao dịch hình ảnh điện tử
## 1. Giới thiệu
Hệ thống giao dịch hình ảnh điện tử là một hệ thống giúp người dùng có thể thương mại hóa các file ảnh của chính mình. Hiện nay, trên thị trường có rất nhiều hệ thống giao dịch điện tử đa phương tiện lớn khác như pixabay, shutterstock,... nhưng những hệ thống kể trên hướng về quốc tế nên việc sử dụng và giao dịch trở nên hơi phức tạp với nhiều người Việt Nam. Nên hệ thống này cung cấp môi trường giao dịch cho bộ phận người Việt và phục vụ nhu cầu của người Việt. 
## 2. Công nghệ được sử dụng
### 2.1. Frontend
* HTML, CSS, SCSS, JS
* ReactJs: Redux, Redux-Saga.
* Material UI
### 2.2. Backend
* Java
* Spring Boot
* Spring Security
* MySQL
* Amazon S3
## 3. Hướng dẫn cài đặt dự án
### 3.1. Lưu ý trước khi cài đặt
* Đảm bảo internet hoạt động tốt
* Hướng dẫn ở dưới dành cho hệ điều hành windows
* Link này chứa tất cả mọi thứ cần cho việc cài đặt nếu có nhu cầu sử dụng: https://drive.google.com/file/d/1ip5Z21p9lEZEYk00CDgi5nceQd1s41uF/view?usp=share_link
### 3.1. Các bước cài đặt
* Bước 1: Cài đặt MySQL Server (version 8.0.34) với port mặc định là 3306 và đặt mật khẩu cho tài khoản root là Admin@123
    * Mở command line và gõ lệnh "mysql --version" kiểm tra MySQL Server đã cài đặt thành công chưa. Nếu chưa, hãy thêm đường dẫn tới thư mục SQL Server vào mục Path của environment variables. Sau đó hãy thử lại "mysql --version"
    * Sau đó hãy gõ lệnh "mysql -h localhost -P 3306 -u root -p" và nhập password là "Admin@123"
    * Tiếp theo, hãy chạy file database.sql được lưu ở trong thư mục /backend hoặc trong folder gg drive bằng câu lệnh "source duong_dan_den_file_database.sql". Sau đó, giữ cho command line tiếp tục chạy, không được tắt.

* Bước 2: Tải thư mục apache-maven version 3.9.2, giải nén và thêm đường dẫn tới thư mục maven vào mục Path của environment variables, sau đó hãy thử lệnh "mvn --version"

* Bước 3: Cài đặt jdk (version 19) và thử câu lệnh "java --version". Nếu thành công, hãy mở một cmd mới ở bên trong thư mục backend và chạy câu lệnh sau: "mvn spring-boot:run" và để yên đó, không được tắt cmd

* Bước 4: Cài đặt Node.js (version 18.16.0) và thử câu lệnh "node --version" trong cmd mới