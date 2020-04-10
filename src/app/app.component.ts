import { Component, AfterViewInit, OnInit } from '@angular/core';
import { correctHeight, detectBody } from 'src/app.helpers';
import { Router, NavigationEnd, ActivationStart } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { MensagensService } from '@shared/services/mensagens.service';

export enum NavigationType {
  Left,
  Top,
  None
}

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  private navigationType = NavigationType.Left;
  mostrarFooter = true;

  constructor(
    private router: Router,
    public mensagensService: MensagensService
  ) {

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(_ => {
      if (!this.mostrarMenuLateral) {
        $('#page-wrapper').css('margin-left', '0px');
        $('body').addClass('top-navigation');
      } else {
        $('#page-wrapper').css('margin-left', '');
        $('body').removeClass('top-navigation');
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof ActivationStart),
      distinctUntilChanged()
    ).subscribe((event: ActivationStart) => {
      if (event.snapshot.data.hasOwnProperty('navigationType')) {
        this.navigationType = event.snapshot.data.navigationType;
      }

      this.mostrarFooter = true;
      if (event.snapshot.data.hasOwnProperty('mostrarFooter')) {
        this.mostrarFooter = event.snapshot.data.mostrarFooter;
      }
    });
  }

  ngAfterViewInit() {
    // Run correctHeight function on load and resize window event
    $(window).bind('load resize', () => {
      correctHeight();
      detectBody();
    });

    // Correct height of wrapper after metisMenu animation.
    $('.metismenu a').click(() => {
      setTimeout(() => {
        correctHeight();
      }, 300);
    });
  }

  get mostrarMenuLateral(): boolean {
    return this.navigationType === NavigationType.Left;
  }

  get mostrarMenuSuperior(): boolean {
    return this.navigationType === NavigationType.Left || this.navigationType === NavigationType.Top;
  }

}
