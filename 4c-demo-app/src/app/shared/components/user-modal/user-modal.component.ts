import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserStore } from 'src/app/features/users/user.store';
import { v4 as uuidv4 } from 'uuid';
import { UniqueNameValidator } from 'src/app/core/validators/unique-name-validator';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  userForm: FormGroup;
  id = uuidv4();

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    private userStore: UserStore,
    private uniqueNameValidator: UniqueNameValidator 
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required], [this.uniqueNameValidator.validate()]), // Apply the async validator
      active: new FormControl(false)
    });
  }

  // Submit handler
  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const newUser = {
        id: this.id,  
        ...formData,
      };

      this.userStore.addUser(newUser); 
      this.dialogRef.close(newUser); 
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
