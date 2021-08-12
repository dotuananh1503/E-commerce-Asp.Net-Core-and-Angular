import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/security/security.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.css']
})
export class HeaderBackComponent implements OnInit {

  constructor(public securityService: SecurityService) { }

  ngOnInit() {
  }

}
