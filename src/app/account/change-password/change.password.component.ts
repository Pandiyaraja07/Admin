import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export class CustomValidators {
	static MatchValidator(source: string, target: string): ValidatorFn {
	  return (control: AbstractControl): ValidationErrors | null => {
		const sourceCtrl = control.get(source);
		const targetCtrl = control.get(target);
  
		return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
		  ? { mismatch: true }
		  : null;
	  };
	}
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change.password.component.html',
  styleUrls: ['./change.password.component.scss']
})

/**
 * Forgot password basic component
 */
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  changePswdForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
	private authService: AuthService,
	private toastr: ToastrService,) { }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.changePswdForm = new FormGroup({
		password: new FormControl('', [Validators.required]),
		new_password: new FormControl('', [Validators.required]),
		confirm_password: new FormControl('', [Validators.required]),
    },
	[CustomValidators.MatchValidator('new_password', 'confirm_password')]
	);
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePswdForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePswdForm.invalid) {
      return;
    }

	this.authService.changePassword(this.f.password.value, this.f.new_password.value)
		.pipe(first())
		.subscribe(data => {
			
		}, error => {
			this.toastr.error(error['message'], "Error");
		});
  }

}
