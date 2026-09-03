import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // 1. เพิ่มตัวช่วยเทส HttpClient

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, 
        NoopAnimationsModule,
        HttpClientTestingModule // 2. ใส่ใน imports
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});