import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserStore } from 'src/app/features/users/user.store';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    private userStore: UserStore
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),  
      active: new FormControl(false)  
    });
  }

  // Submit handler
  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      
      const newUser = {
        id: Date.now(),  
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
