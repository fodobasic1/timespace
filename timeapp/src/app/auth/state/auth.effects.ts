import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { autoLogin, autoLoginFailed, loginFailed, loginStart, loginSuccess, logout } from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            mergeMap((action) => {
                return this.authService
                    .login(action.username, action.password, action.timeapiguid)
                    .pipe(
                        map((data) => {
                            debugger
                            const serverResponse = this.authService.convertToServerRespose(data);
                            console.log('server resp : ', serverResponse);
                            this.authService.setUserDataLocalStorage(serverResponse.Token);
                            return loginSuccess({ response: serverResponse, redirect: true });
                        }),
                        catchError((error) => {
                            console.log('err : ', error);
                            return of(loginFailed({ message: error.error.error.message }));
                        })
                    );
            })
        );
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            tap((action) => {
                debugger
                if(action.redirect) {
                    this.router.navigate(['/users'])
                }
            })
        )
    }, { dispatch: false });

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.fethcUserFromLocalStorage();
                if(user) {
                    return of(loginSuccess({ response: user, redirect: true}));
                }
                
                this.router.navigate(['/settings']);
                return of(autoLoginFailed());
            })
        )
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logout),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['/']);
            })
        )
    }, { dispatch: false });
}