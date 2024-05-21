import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-import-user',
  templateUrl: './import-user.component.html',
  styleUrls: ['./import-user.component.scss']
})
export class ImportUserComponent implements OnInit {

  file: any

  noFileError = false;
  fileError = false;
  isLoading = false;

  imagePreview: any = './assets/images/excel.png';

  constructor(public dialogRef: MatDialogRef<ImportUserComponent>, private userService: UserService) { }

  ngOnInit(): void { }

  onFileChange(files: FileList): void {
    this.file = files.item(0);
    this.noFileError = false

    if (this.file) {
      const fileType = this.file.type;
      if (fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        fileType !== 'application/vnd.ms-excel' && fileType !== 'text/csv') {
        this.fileError = true;
      } else {
        this.fileError = false;
      }
    }
  }

  onSubmit() {
    if (!this.file)
      this.noFileError = true
    else {
      this.isLoading = true;
      const Toast = Swal.mixin({
        toast: true,
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      const formData = new FormData();
      formData.append('file', this.file);

      // @ts-ignore
      this.userService.postFile(formData, {
        observe: 'response',
        responseType: 'text'
      })
        .subscribe((response) => {
          this.isLoading = false;
          this.closeDialog();
          Toast.fire({
            icon: 'warning',
            title: 'Users added '+ response,
            position: 'top',
            width: 450,
          })
        })
    }
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  downloadFile() {
    const filename = 'users.xlsx';
    const templatePath = 'assets/files/users.xlsx';

    // Create an anchor element
    const link = document.createElement('a');
    link.href = templatePath;
    link.download = filename;

    // Append the link to the document and click it programmatically
    document.body.appendChild(link);
    link.click();

    // Clean up the link
    document.body.removeChild(link);
  }
}
