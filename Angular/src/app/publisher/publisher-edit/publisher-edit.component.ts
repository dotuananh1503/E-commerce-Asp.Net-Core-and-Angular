import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { publisherCreationDTO, publisherDTO } from '../publisher.model';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-edit',
  templateUrl: './publisher-edit.component.html',
  styleUrls: ['./publisher-edit.component.css']
})
export class PublisherEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private publisherService: PublisherService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data) { }

  model: publisherDTO;
  ngOnInit(): void {
    this.model = this.data.element
  }

  saveChanges(publisherCreationDTO: publisherCreationDTO) {
    console.log(publisherCreationDTO);
    this.publisherService.edit(this.model.id, publisherCreationDTO).subscribe(() => {
      this.router.navigate(['/publishers']);
    });
  }

}
