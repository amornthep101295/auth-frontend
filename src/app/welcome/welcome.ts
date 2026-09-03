import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // นำเข้าปุ่ม
import { Router } from '@angular/router'; // นำเข้า Router เพื่อใช้เปลี่ยนหน้า

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule], // เพิ่ม MatButtonModule
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss']
})
export class WelcomeComponent implements OnInit {
  username: string = 'xxx'; 

  constructor(private router: Router) {}

  ngOnInit() {
    const expiry = localStorage.getItem('loginExpiry');
    const now = new Date().getTime();

    // เช็กว่า ไม่มี Cache อยู่ หรือ เวลาปัจจุบันเกินเวลาหมดอายุ (5 นาที) ไปแล้ว
    if (!expiry || now >= parseInt(expiry, 10)) {
      localStorage.clear(); // เคลียร์ Cache ทิ้งทั้งหมด
      this.router.navigate(['/']); // ดีดกลับหน้า Login ทันที
      return; // หยุดการทำงานของฟังก์ชัน
    }

    // ถ้ายังไม่หมดเวลา ก็ดึงชื่อมาแสดงตามปกติ
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.username = storedUser;
    }
  }

  // ฟังก์ชันออกจากระบบ (เมื่อกดปุ่ม)
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}