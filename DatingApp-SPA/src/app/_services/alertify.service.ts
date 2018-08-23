import { Injectable } from '@angular/core';
declare let alertify: any; // สร้างเพื่อเวลาเราจะใช้ alertufy ในไฟล์ angular อื่นๆ จะไม่ต้อง import class เข้าไป Section 6 lecture 53

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
