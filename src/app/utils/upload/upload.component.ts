import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public imagePath;
  public message: string;
  @Output() imgURL = new EventEmitter<any>();
  @Output() files = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL.emit(reader.result);
      this.files.emit(files);
    };
  }

}
