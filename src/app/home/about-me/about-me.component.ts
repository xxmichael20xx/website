import { Component, OnInit } from '@angular/core';
import { cms, skill } from 'src/app/service-interface';
import { CmsService } from 'src/app/services/cms.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  public aboutMe: cms;
  public fronts: skill[] = []
  public backs: skill[] = [];

  constructor(
    private cmsService: CmsService,
    private logService: LogService
  ) {
    this.logService.log().subscribe();
  }

  ngOnInit(): void {
    this.cmsService.getCmsByTitle("about me").subscribe(data => {
      this.aboutMe = data;
    });

    this.cmsService.getCategorySkill("Front-End").subscribe(data => {
      if (data.length > 0) {
        this.fronts = data;
      }
    });

    this.cmsService.getCategorySkill("Back-End").subscribe(data => {
      if (data.length > 0) {
        this.backs = data;
      }
    });
  }

}
