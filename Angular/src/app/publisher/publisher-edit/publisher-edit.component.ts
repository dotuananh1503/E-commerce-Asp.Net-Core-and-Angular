import { Component, OnInit } from '@angular/core';
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
    private router: Router) { }

  model: publisherDTO;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.publisherService.getById(params.id).subscribe(publisher => this.model = publisher);
    });
  }

  saveChanges(publisherCreationDTO: publisherCreationDTO){
    console.log(publisherCreationDTO);
    this.publisherService.edit(this.model.id, publisherCreationDTO).subscribe(() => {
      this.router.navigate(['/publishers']);
    });
  }

}
