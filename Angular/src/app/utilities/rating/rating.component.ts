import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor(private securityService: SecurityService, private fb: FormBuilder, private ratingsService: RatingService) { }

  @Input()
  maxRating = 5;
  @Input()
  selectedRate = 0;
  @Input()
  bookId: number;
  @Output()
  onRating: EventEmitter<number> = new EventEmitter<number>();
  previousRate = 0;
  ratingForm: FormGroup;
  maxRatingArr = [];

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
    this.ratingForm = this.fb.group({
      rating: [null, Validators.required],
      comment: '',
    })
  }

  onSubmit() {
    var rating = this.ratingForm.get('rating').value;
    var comment = this.ratingForm.get('comment').value;
    this.ratingsService.rate(this.bookId, rating, comment).subscribe(() => {
      Swal.fire("Success", "Đánh giá thành công", "success");
    }, err => {
      console.log(err);
      Swal.fire("Failed", "Có lỗi khi đánh giá", "error");
    })
  }

  handleMouseEnter(index: number) {
    this.selectedRate = index + 1;
  }

  handleMouseLeave() {
    if (this.previousRate !== 0) {
      this.selectedRate = this.previousRate;
    } else {
      this.selectedRate = 0;
    }
  }

  rate(index: number) {
    if (this.securityService.isAuthenticated()) {
      this.selectedRate = index + 1;
      this.previousRate = this.selectedRate;
      this.onRating.emit(this.selectedRate);
    } else {
      Swal.fire("Error", "You need to log in before voting", "error");
    }

  }

}
