import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // 1. เปลี่ยนชื่อเป็น AppComponent

bootstrapApplication(AppComponent, appConfig) // 2. เปลี่ยนชื่อตรงนี้ด้วย
  .catch((err) => console.error(err));