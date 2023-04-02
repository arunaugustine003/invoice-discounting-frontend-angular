import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit,DoCheck {
  isadmin=false;

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private router: Router) {
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    // this.router.navigate(['/login']);
  }
  ngDoCheck(): void {
    let role=sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isadmin = true;
    }else{
      this.isadmin = false;
    }
  }
}
