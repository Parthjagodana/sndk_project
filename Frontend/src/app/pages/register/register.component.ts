import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  submitting = false;
  submitted = false;
  fileName: any;
  profileImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePicture: [null],
      status: [false],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  // selection profile image and set the profile preview
  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    this.fileName = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Select profile image
  selectImage() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    const user: User = this.form.value;
    const formData: any = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('file', this.fileName);
    formData.append('status', user.status.toString());
    formData.append('password', user.password);
    this.authService
      .register(formData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('User register successfully');
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
          this.submitting = false;
        },
      });
  }
}
