/* eslint-disable @angular-eslint/component-selector */
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from '../UserSession/UserSession.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {
  constructor(
    private usersessionService: UserSessionService,
    private router: Router,
    private location: Location,
    private modalService: NgbModal
  ) {}
  canActivate(): boolean {
    const user = this.usersessionService.getSession();
    if (user.role === 'Admin') {
      return true;
    } else {
      // this.openAlertModal();
      this.router.navigate(['error']);
      return false;
    }
  }
  // Hàm để mở modal thông báo
  openAlertModal() {
    this.modalService.open(AlertModalComponent, { centered: true });
  }
}

// Component của modal thông báo
@Component({
  selector: 'alert-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" style="color: red;"><b>THÔNG BÁO</b></h4>
    </div>
    <div class="modal-body">
      <p>Tài khoản của bạn không thể sử dụng chức năng này!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="modalService.dismissAll()">OK</button>
    </div>
  `
})
export class AlertModalComponent {
  constructor(public modalService: NgbModal) {}
}
