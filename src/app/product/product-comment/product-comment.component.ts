import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.css'],
  providers: [CommentService]
})
export class ProductCommentComponent implements OnInit {

  commentForm: FormGroup;
  loadComment = [];
  constructor(private toastService: ToastrService, private commentService: CommentService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    let productname = '';
    let desc = '';

    this.commentForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'content': new FormControl(null, Validators.required)
      }
    );
  }

  showToastr(){
    this.toastService.success("Bình luận thành công","Thông báo");
  }

  onAddComment(){
    this.loadComment.push({
      name: this.commentForm.get('name').value,
      email: this.commentForm.get('email').value,
      content: this.commentForm.get('content').value,
      date: Date.now()
    })
  }

  onSendComment(){
    this.onAddComment();
    this.commentService.createProducts(this.loadComment);
    this.showToastr();
    this.initForm();
    setTimeout(function(){window.location.reload();},500);
  }

}
