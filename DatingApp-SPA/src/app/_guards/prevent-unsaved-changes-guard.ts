import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

// Section 10 Lecture 97 Subject Can Deactive guard * Add class นี้ที่ app module และที่ routes.ts ด้วย
@Injectable()
export class PreventUnsaveChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) { // ถ้า form dirty แสดง dialog box confirm ถ้าผู้ใช้งานตอบ yes ก็ถึงจะไปต่อ
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        // ถ้าไม่เข้า if บนก็เป็น true ปล่อยผ่านไปแบบปกติเลย
        return true;
    }
}
