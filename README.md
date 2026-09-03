# Authentication UI (Frontend)

โปรเจกต์หน้าบ้านสำหรับระบบ Authentication พัฒนาด้วย Angular (Standalone Components) พร้อมระบบจัดการ State การล็อกอิน และ UI ที่สวยงามจาก Angular Material

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Framework:** Angular v22 (Standalone Components)
- **UI Library:** Angular Material
- **Security:** HTTP Interceptor (JWT Injection) & Route Guards

## 📋 สิ่งที่ต้องติดตั้งก่อนเริ่มงาน (Prerequisites)
1. [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน LTS ล่าสุด)
2. Angular CLI (ติดตั้งผ่านคำสั่ง `npm install -g @angular/cli`)

## 🚀 การตั้งค่าและการรันโปรเจกต์ (Setup & Run)

### 1. ติดตั้ง Dependencies
เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วรันคำสั่ง:
```bash
npm install

### 2. ตั้งค่า Environment
ตรวจสอบไฟล์ src/environments/environment.development.ts (สำหรับการรัน Local)


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
