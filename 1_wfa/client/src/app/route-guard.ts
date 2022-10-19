import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MetricsService } from "./services/metrics.service";


@Injectable({
    providedIn: 'root'
})
export class RouteMetrics implements CanActivate {
    constructor(private metricsService: MetricsService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('route = ', route);
        console.log('state = ', state);
        this.metricsService.addPageVisitedFrom('', '');
        return true;
    }
}