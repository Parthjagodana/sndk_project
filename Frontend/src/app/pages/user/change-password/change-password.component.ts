import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/utils/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  account = '';
  form!: FormGroup;
  submitting = false;
  submitted = false;
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.userService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('Password change successful');
          this.router.navigate(['/users'], { relativeTo: this.route });
        },
        error: (err) => {
          console.log('err', err);
          this.toastr.error(err.error.message);
          this.submitting = false;
        },
      });
  }
}
