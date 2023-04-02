import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbMenuService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-corporates',
  templateUrl: './corporates.component.html',
  styleUrls: ['./corporates.component.scss']
})
export class CorporatesComponent implements OnInit,OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  isadmin=false;
  statuses: NbComponentStatus[] = [ 'primary', 'success', 'info', 'warning', 'danger' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
  constructor(private menuService: NbMenuService,private toastr: ToastrService,) {
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
   }

  ngOnInit(): void {
    if(this.isadmin){
      this.toastr.warning("User not authorized to view this Page", "Warning");
      this.navigateHome();
    }
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
