import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CacheRouteReuseStrategy implements RouteReuseStrategy {
	allowRetriveCache: any = {
		"functional-skill-gap-matrix": true
	};
	storedRouteHandles = new Map<string, DetachedRouteHandle>();

	// Decides if the route should be stored
	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return this.allowRetriveCache.hasOwnProperty(this.getPath(route));
	}

	//Store the information for the route we're destructing
	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		const path = route.routeConfig?.path;
		if(path){
		this.storedRouteHandles.set(path, handle);
		}
	}
	
	

	//Return true if we have a stored route object for the next route
	shouldAttach(route: ActivatedRouteSnapshot): boolean {
		const path = this.getPath(route);
		return this.allowRetriveCache[path] ? this.storedRouteHandles.has(path) : false;
	}

	//If we returned true in shouldAttach(), now return the actual route data for restoration
	// retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
	// 	return this.storedRouteHandles.get(route.routeConfig.path);
	// }

	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
		const path = route.routeConfig?.path;
		if (path) {
			return this.storedRouteHandles.get(path) || null;
		}
		return null; 
	}

	//Reuse the route if we're going to and from the same route
	shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		if (this.getPath(future) === 'functional-skill-gap-matrix' 
			&& this.getPath(curr) === 'functional-skill-gap-matrix/view-general-comments') {
			this.allowRetriveCache['functional-skill-gap-matrix'] = true;
		} else {
			this.allowRetriveCache['functional-skill-gap-matrix'] = false;
		}

		return future.routeConfig === curr.routeConfig;
	}

	// private getPath(route: ActivatedRouteSnapshot): string {
	// 	if (route.routeConfig !== null && route.routeConfig.path !== null) {
	// 		return route.routeConfig.path;
	// 	}
	// 	return '';
	// }

	private getPath(route: ActivatedRouteSnapshot): string {
		if (route.routeConfig !== null && route.routeConfig.path !== undefined) {
		  return route.routeConfig.path;
		}
		return '';
	  }
	  
}