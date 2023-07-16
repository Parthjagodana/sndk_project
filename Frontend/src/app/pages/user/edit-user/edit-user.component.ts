import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  form!: FormGroup;
  submitting = false;
  submitted = false;
  fileName: any;
  userDetails: any;
  userId!: string;
  profileImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userDetails = this.userService.userData;
    this.userId = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: [null],
      status: [false],
    });

    if (this.userDetails) {
      if (this.userDetails.profileImage)
        this.profileImage = this.userDetails.profileImage;
      this.form.patchValue(this.userDetails);
    }

    if (!this.userDetails) {
      this.router.navigate(['users']);
    }
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
    if (this.fileName) formData.append('file', this.fileName);
    formData.append('status', user.status.toString());
    this.userService
      .updateUser(this.userId, formData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('User update successfully');
          this.router.navigate(['users']);
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
          this.submitting = false;
        },
      });
  }
}
