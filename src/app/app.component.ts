import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';
  titleAlert:string = 'This field is required';

  constructor(private fb: FormBuilder) {

    this.rForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])),
      validate: new FormControl('')
    });

  }

  ngOnInit() {

    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.rForm.get('name').setValidators(Validators.required);
        }
        this.rForm.get('name').updateValueAndValidity();
      }
    )
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }

}
