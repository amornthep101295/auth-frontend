import { Component, Inject, OnInit } from '@angular/core'; 
import { RouterLink, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../environments/environment';

// 1. นำเข้า MatIconModule
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-login-alert-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title style="color: #005A36;">{{ data.title }}</h2>
    <mat-dialog-content>
      <p style="font-size: 16px; margin-top: 10px;">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="center" style="margin-bottom: 10px;">
      <button mat-flat-button mat-dialog-close style="background-color: #A47B46; color: white; padding: 0 30px;">ตกลง</button>
    </mat-dialog-actions>
  `
})
export class LoginAlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {}
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule, MatCardModule, MatDialogModule,
    MatIconModule // 2. ใส่ MatIconModule ใน imports
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit { 
  loginForm: FormGroup;
  apiUrl = `${environment.apiUrl}/auth/login`;

  // 3. สร้างตัวแปรเก็บสถานะซ่อนรหัสผ่าน (เริ่มต้นให้ซ่อนไว้)
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.checkLoginCache();
  }

  checkLoginCache() {
    const expiry = localStorage.getItem('loginExpiry');
    if (expiry) {
      const now = new Date().getTime();
      if (now < parseInt(expiry, 10)) {
        this.router.navigate(['/welcome']); 
      } else {
        localStorage.clear();
      }
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = {
        ...this.loginForm.value,
        username: this.loginForm.value.username.toLowerCase()
      };

      this.http.post(this.apiUrl, formData).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          const expiryTime = new Date().getTime() + (5 * 60 * 1000);
          localStorage.setItem('loginExpiry', expiryTime.toString());
          this.router.navigate(['/welcome']);
        },
        error: (err) => {
          let errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          }
          this.dialog.open(LoginAlertDialogComponent, {
            width: '350px',
            data: { title: 'เข้าสู่ระบบล้มเหลว', message: errorMessage }
          });
        }
      });
    }
  }
}