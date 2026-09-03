import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.html', // ชี้ไปที่ไฟล์ HTML ของคุณ
})
export class AppComponent {
  // สร้างตัวแปรไว้เก็บชื่อหน้าจอ เริ่มต้นให้เป็นหน้า Login
  pageTitle = 'IT 02-1'; 

  constructor(private router: Router) {
    // ดักจับเหตุการณ์เวลาเปลี่ยนหน้าเว็บเสร็จ (NavigationEnd)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      
      const url = event.urlAfterRedirects || event.url;

      // เช็ก URL แล้วเปลี่ยนชื่อหัว Toolbar ให้ตรงตามหน้า
      if (url === '/' || url === '/login') {
        this.pageTitle = 'IT 02-1';
      } else if (url === '/register') {
        this.pageTitle = 'IT 02-2';
      } else if (url.includes('/welcome')) {
        this.pageTitle = 'IT 02-3';
      } else {
        this.pageTitle = 'IT 02'; // เผื่อกรณีหลุดไปหน้าอื่น
      }
      
    });
  }
}