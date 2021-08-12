import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  loadedContact = [];
  contactForm: FormGroup;
  constructor(private contactService: ContactService, private toastService: ToastrService) { }

  ngOnInit() {
    this.initForm();
  }


  showToastr(){
    this.toastService.success("Gửi liên hệ thành công","Thông báo");
  }
  
  private initForm(){
    let productname = '';
    let desc = '';

    this.contactForm = new FormGroup({
        'email': new FormControl(null, Validators.required),
        'content': new FormControl(null, Validators.required),
      }
    );
  }

  onAddContact(){
    this.loadedContact.push({
      email: this.contactForm.get('email').value,
      content: this.contactForm.get('content').value,
    })
  }

  onSendContact(){
    this.onAddContact();
    this.contactService.createProducts(this.loadedContact);
    this.showToastr();
    this.initForm();
  }
}
