import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  constructor(
    private fb: NonNullableFormBuilder, 
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      let email = this.validateForm.get('userName')?.value || '';
      let senha = this.validateForm.get('password')?.value || '';

      this.authService.login(email, senha)
      .subscribe({
        next:(v) => this.sucesso(v),
        error:(e) => this.erro(e),
        complete:() => console.log('complete login')
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  redirectToHome(): void {
    this.router.navigate(['/agenda']);
  }


  sucesso(success: any){
    this.authService.LocalStorage.salvarDadosLocaisUsuario(success);
    this.notification.createBasicNotification('success', 'bg-success', 'text-light', success.message);
    this.redirectToHome();
  }

  erro(fail: any){
    this.notification.createBasicNotification('error', 'bg-danger', 'text-light', fail.message)
  }

  
}
