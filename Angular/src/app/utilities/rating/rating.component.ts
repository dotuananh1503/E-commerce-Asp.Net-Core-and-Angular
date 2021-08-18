import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor(private securityService: SecurityService, private fb: FormBuilder, 
    private ratingsService: RatingService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  @Output()
  onRating: EventEmitter<number> = new EventEmitter<number>();
  previousRate = 0;
  ratingForm: FormGroup;

  ngOnInit(): void {
    this.ratingForm = this.fb.group({
      rating: [null, Validators.required],
      comment: '',
    })
  }

  onSubmit() {
    var rating = this.ratingForm.get('rating').value;
    var comment = this.ratingForm.get('comment').value;
    this.ratingsService.rate(this.data.id, rating, comment).subscribe(() => {
      Swal.fire("Success", "Đánh giá thành công", "success");
    }, err => {
      console.log(err);
      Swal.fire("Failed", "Có lỗi khi đánh giá", "error");
    })
  }

}
