import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { publisherCreationDTO } from '../publisher.model';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.css']
})
export class PublisherCreateComponent implements OnInit {

  constructor(private publisherService: PublisherService, private router: Router) { }

  ngOnInit() {
  }

  saveChanges(publisherCreationDTO: publisherCreationDTO){
    this.publisherService.create(publisherCreationDTO).subscribe(() => {
      this.router.navigate(['/publishers']);
    });
  }

}
