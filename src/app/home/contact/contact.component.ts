import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contact: any;
  public email: any;
  public facebookUrl: any;
  public facebookLabel: any;

  constructor(
    private cmsService: CmsService
  ) { }

  ngOnInit(): void {
    this.cmsService.getCmsByTitle("Contact").subscribe(data => {
      if (data) {
        this.contact = data;
      }
    });

    this.cmsService.getCmsByTitle("Email").subscribe(data => {
      if (data) {
        this.email = data;
      }
    });

    this.cmsService.getCmsByTitle("Facebook").subscribe(data => {
      if (data) {
        let temp = data.details.split("||");
        this.facebookLabel = temp[1];
        this.facebookUrl = temp[0];
      }
    });
  }

}
