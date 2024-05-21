import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MediaMatcher} from '@angular/cdk/layout';
import {MenuItems} from '../../../shared/menu-items/menu-items';
import {AuthenticationService} from "../../../authentication/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: []
})

export class VerticalAppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  connectedUserFullname: string | null;
  connectedUserRole: string | null;
  @Input() showClass = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();


  private _mobileQueryListener: () => void;
  status = true;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  setClickedRow(i: number, j: number): void {
    this.parentIndex = i;
    this.childIndex = j;
  }

  subclickEvent(): void {
    this.status = true;
  }

  scrollToTop(): void {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthenticationService,
    private router: Router,
    public menuItems: MenuItems
  ) {
    this.connectedUserFullname = localStorage.getItem('firstName');
    this.connectedUserRole = localStorage.getItem('role');
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  handleNotify(): void {
    if (window.innerWidth < 1024) {
      this.notify.emit(!this.showClass);
    }
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
