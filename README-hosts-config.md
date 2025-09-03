# Hướng dẫn cấu hình file hosts

## Cấu hình trên Linux/macOS

1. Mở terminal với quyền sudo:
```bash
sudo nano /etc/hosts
```

2. Thêm dòng sau vào cuối file:
```
127.0.0.1    mywebsite
```

3. Lưu file và thoát:
   - Trong nano: Ctrl+X, sau đó Y, sau đó Enter
   - Trong vim: Esc, sau đó :wq

## Cấu hình trên Windows

1. Mở Command Prompt hoặc PowerShell với quyền Administrator

2. Mở file hosts:
```cmd
notepad C:\Windows\System32\drivers\etc\hosts
```

3. Thêm dòng sau vào cuối file:
```
127.0.0.1    mywebsite
```

4. Lưu file và đóng notepad

## Kiểm tra cấu hình

Sau khi cấu hình xong, bạn có thể kiểm tra bằng lệnh:

```bash
ping mywebsite
```

Kết quả sẽ hiển thị ping đến 127.0.0.1 (localhost).

## Lưu ý

- Cần quyền administrator/sudo để chỉnh sửa file hosts
- Thay đổi có hiệu lực ngay lập tức, không cần khởi động lại
- Để xóa cấu hình, chỉ cần xóa dòng đã thêm trong file hosts
