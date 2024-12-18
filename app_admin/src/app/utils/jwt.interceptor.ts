import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { Injectable, Provider } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpEvent<any>> {
        var isAuthAPI: boolean;

        if (req.url.startsWith('login') || 
            req.url.startsWith('register')) {
            isAuthAPI = true;
        } else {
            isAuthAPI = false;
        }

        if (this.authService.isLoggedIn() && !isAuthAPI) {
            let token = this.authService.getToken();
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}

export const authInterceptProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor, 
    multi: true
};
