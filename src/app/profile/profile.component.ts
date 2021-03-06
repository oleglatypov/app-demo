import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar-service.service';
import { DialogService } from '../services/dialog.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService,
    public snackBar: SnackBarService,
    public dialogService: DialogService) { }

  ngOnInit() {
  }

  deleteAccountClick() {
    let successMsg = "Your account has been deleted mate. Will love to have you back";

    this.dialogService.showConfirmDialog("Are you sure you want to delete your account")
      .afterClosed().subscribe(result => {

        var r = result;
        if (r == true) {
          let snackBarRef = this.snackBar.showProgress("Deleteing your account...")
          this.auth._user.delete()
            .then(() => {
              this.snackBar.showMessage(successMsg);
            })
            .catch(err => {
              snackBarRef.dismiss();
              switch (err['code']) {
                case 'auth/requires-recent-login':

                  this.dialogService.showPromptDialog("Please enter your password", "password")
                    .afterClosed().subscribe(result => {
                      var password = result;
                      const credentials = firebase.auth.EmailAuthProvider.credential(this.auth._user.email, password);
                      this.auth._user.reauthenticateWithCredential(credentials)
                        .then(() => {

                          this.auth._user.delete()
                            .then(() => {
                              this.snackBar.showMessage(successMsg);
                            })
                            .catch(err => {
                              this.snackBar.showMessage("Something went wrong, please go f ur self");
                            })

                        })
                        .catch((err) => {
                          switch (err['code']) {
                            case 'auth/wrong-password':
                              this.snackBar.showMessage("You entered the wrong password");
                              break;

                            default:
                              this.snackBar.showMessage("Something went wrong");
                          }
                        })

                    });
                  break;

                default:
                  this.snackBar.showMessage("Something went wrong");

              }
            })
        }
      })
  }
}
