import { Component, Inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../environments/environment';

// 1. นำเข้า MatIconModule
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert-dialog',
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
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {} 
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    RouterLink,
    MatIconModule // 2. ใส่ MatIconModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiUrl = `${environment.apiUrl}/auth/register`;

  // 3. สร้างตัวแปรแยก 2 ช่อง
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator }); 
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = {
        ...this.registerForm.value,
        username: this.registerForm.value.username.toLowerCase()
      };
      
      this.http.post(this.apiUrl, formData).subscribe({
        next: (response: any) => {
          const successMessage = response.message || 'สมัครสมาชิกสำเร็จเรียบร้อยแล้ว';
          
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '350px',
            data: { title: 'สำเร็จ', message: successMessage }
          });

          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/']);
          });
        },
        error: (err) => {
          let errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
          
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          }

          this.dialog.open(AlertDialogComponent, {
            width: '350px',
            data: { title: 'แจ้งเตือน', message: errorMessage }
          });
        }
      });
    }
  }
}