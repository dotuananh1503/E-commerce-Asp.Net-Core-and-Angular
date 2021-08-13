import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { bookDTO } from 'src/app/book/book.model';
import { BookService } from 'src/app/book/book.service';
import { environment } from 'src/environments/environment';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

/*   @Input() photos: Photo[]; */
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl =  environment.apiURL + '/products';
  currentMain: Photo;
  model: bookDTO;
  constructor(private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.bookService.getById(params.id).subscribe((product) => {
          this.model = product;
          console.log(this.model);
          this.initializeUploader();
      });
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}/${this.model.id}/Photos`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain,
        };
        this.model.photos.push(photo);
        if (res.isMain) {
          this.bookService.photoUrl.next(res.url);
        }
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.bookService.setMainPhoto(this.model.id, photo.id).subscribe(response => {
      this.currentMain = this.model.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.bookService.photoUrl.next(photo.url);
    });
  }

  deletePhoto(photo: Photo) {
      this.bookService.deletePhoto(this.model.id, photo.id).subscribe(response => {
        this.model.photos.splice(this.model.photos.findIndex(p => p.id === photo.id), 1);
        console.log("XÓA THÀNH CÔNG");
      }
    );
  }
}
