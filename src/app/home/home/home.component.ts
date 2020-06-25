import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';
import { cms } from 'src/app/service-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public infos = ["name", "birthday", "job", "email", "degree"];
  public informations: cms[] = [];

  public links: any[] = [
    {
      path: "about-me",
      label: "About me"
    },
    {
      path: "projects",
      label: "Projects"
    },
    {
      path: "contact",
      label: "Contact"
    }
  ];

  constructor(
    private cmsService: CmsService
  ) {
  }

  ngOnInit(): void {
    this.infos.forEach((element, index) => {
      this.cmsService.getCmsByTitle(element).subscribe(data => {
        this.informations.push(data);
      });
    });
  }

}
