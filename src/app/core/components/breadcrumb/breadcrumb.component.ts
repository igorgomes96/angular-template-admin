import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged, tap, map } from 'rxjs/operators';

interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs$: Observable<BreadCrumb[]>;
  titulo = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.breadcrumbs$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      tap(_ => {
        this.titulo = '';
        this.getTitle(this.activatedRoute);
      }),
      map(_ => this.buildBreadCrumb(this.activatedRoute))
    );
  }

  getTitle(route: ActivatedRoute) {
    if (route.routeConfig && route.routeConfig.data && route.routeConfig.data.hasOwnProperty('titulo')) {
      this.titulo = route.routeConfig.data.titulo;
    }
    if (route.firstChild) {
      this.getTitle(route.firstChild);
    }
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path
    let label: string =
      (route.routeConfig && route.routeConfig.data && route.routeConfig.data.hasOwnProperty('titulo'))
        ? route.routeConfig.data.titulo
        : '';

    // Se for parâmetros
    if (label.startsWith(':')) {
      const param: string = label.substring(1);
      route.paramMap.subscribe(p => {
        if (p.has(param)) {
          label = p.get(param);
        }
      });
    }
    const path = route.routeConfig ? route.routeConfig.path : '';

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label,
      url: nextUrl
    };
    let newBreadcrumbs = [...breadcrumbs];
    if (label !== '') {
      newBreadcrumbs = [...breadcrumbs, breadcrumb];
    }
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

}
