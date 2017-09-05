import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public snackBar: MdSnackBar, public auth: AuthService, public dialog: MdDialog) { }


  signInWithEmailAndPassword(formData: NgForm) {
    if (formData.valid) {
      let snackBarRef = this.snackBar.openFromComponent(SigningInSnack);

      this.auth.signInWithEmailAndPass(formData.value.email, formData.value.password)
        .then(value => {
          this.snackBar.open('Welcome back mate!', null, {
            duration: 3000
          });
        })
        .catch(err => {
          snackBarRef.dismiss();
        });
    }
  }

  showPasswordResetDialog(): void {
    let dialogRef = this.dialog.open(ForgotPasswordComponent);
    dialogRef.afterClosed().subscribe(email => {
      if (email) {
        this.auth.sendPasswordResetEmail(email)
          .then(result => {
            this.snackBar.open('We have sent an email to ' + email + ', you should get it shortly.', null, {
              duration: 3000
            });
          })
      }
    });
  }

}

@Component({
  selector: 'signing-in-snack',
  template: `
   <div fxLayout fxLayoutAlign='center center'>
     <span fxFlex>Signing you in...</span>
     <md-spinner style="height: 2em; width: 2em;"></md-spinner>
   </div>
   `
})
export class SigningInSnack { }
