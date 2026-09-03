import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-session-expired-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title style="color: #005A36;">แจ้งเตือน</h2>
    <mat-dialog-content>
      <p style="font-size: 16px; margin-top: 10px;">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="center" style="margin-bottom: 10px;">
      <button mat-flat-button mat-dialog-close style="background-color: #A47B46; color: white; padding: 0 30px;">ตกลง</button>
    </mat-dialog-actions>
  `
})
export class SessionExpiredDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
    
  const router = inject(Router);
  const dialog = inject(MatDialog);

  let clonedReq = req;
    
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {      
      if (error.status === 401) {
                
        localStorage.clear();
                
        dialog.open(SessionExpiredDialogComponent, {
          width: '350px',
          data: { message: 'เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง' }
        });
        
        router.navigate(['/']);
      }
      
      return throwError(() => error);
    })
  );
};