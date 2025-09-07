import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container">
      <div class="error-code">404</div>
      <h1>Không tìm thấy trang</h1>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <p>Vui lòng kiểm tra lại đường dẫn URL hoặc quay về trang chủ.</p>
      <button (click)="goHome()" class="back-button">Về trang chủ</button>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      text-align: center;
      background-color: #f5f5f5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .error-code {
      font-size: 8rem;
      font-weight: bold;
      color: #e74c3c;
      margin: 0;
      line-height: 1;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
    
    h1 {
      color: #2c3e50;
      margin: 1rem 0;
      font-size: 2rem;
    }
    
    p {
      color: #666;
      line-height: 1.6;
      margin: 0.5rem 0;
      max-width: 500px;
    }
    
    .back-button {
      background: #3498db;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 2rem;
      transition: background 0.3s ease;
    }
    
    .back-button:hover {
      background: #2980b9;
    }
    
    @media (max-width: 768px) {
      .error-code {
        font-size: 6rem;
      }
      
      h1 {
        font-size: 1.5rem;
      }
      
      .error-container {
        padding: 1rem;
      }
    }
  `]
})
export class Error404Component {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
