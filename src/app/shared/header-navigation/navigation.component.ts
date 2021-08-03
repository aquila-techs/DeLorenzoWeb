import { AuthHelperService } from './../../services/authHelper.service';
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  language = "";
  constructor(public translate: TranslateService, private modalService: NgbModal, private AuthHelperService: AuthHelperService, private router: Router) {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');
    this.language = localStorage.getItem("language");
    if (this.language === "" || this.language === "English") {
      localStorage.setItem("language", "English");
    } else {
      localStorage.setItem("language", "Dutch")
    }
  }

  //Language Switcher
  switchLang(lang: string) {
    console.log(lang)
    if (lang == "en") {
      this.language = "English"
      localStorage.setItem("language", "English");
      window.location.reload()
    } else {
      this.language = "Dutch"
      localStorage.setItem("language", "Dutch")
      window.location.reload()
    }

    this.translate.use(lang);
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  logOut() {
    this.AuthHelperService.logOut();
    this.router.navigate(['/login']);
  }

  ngAfterViewInit() {}
}
