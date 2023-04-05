import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbMenuService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CorporateData } from '../../interfaces/corporateList';

@Component({
  selector: 'ngx-corporates',
  templateUrl: './corporates.component.html',
  styleUrls: ['./corporates.component.scss']
})
export class CorporatesComponent implements OnInit,DoCheck,OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  corporateData: CorporateData;
  isadmin=false;
  constructor(private menuService: NbMenuService,private toastr: ToastrService,private service: AuthService) {
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
   }
  ngOnInit(): void {
    this.service.getCorporateData("/v1/corporate/list_corporates/").subscribe((data:CorporateData) => {
      console.log(data);
      if (data.code === '200') {
        this.corporateData = data;
        // this.successMsg = data.msg;
      }
    }, (error) => {
      console.log(error);
    });
    
    // if(!this.isadmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
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
