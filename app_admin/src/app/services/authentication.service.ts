import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthenticationService {
  
    private TOKEN_KEY = 'travlr-token';
    
    constructor(
      @Inject(BROWSER_STORAGE) 
      private storage: Storage,
      private tripDataService: TripDataService
    ) { }
  
    public getToken(): string | null {
      return this.storage.getItem(this.TOKEN_KEY);
    }
  
    public saveToken(token: string): void {
      this.storage.setItem(this.TOKEN_KEY, token);
    }
  
    public login(user: User): Promise<any> {
      return this.tripDataService.login(user)
        .then((authResp: AuthResponse) => this.saveToken(authResp.token));
    }
  
    public register(user: User): Promise<any> {
      return this.tripDataService.register(user)
      .then((authResp : AuthResponse) => 
        this.saveToken(authResp.token));
    }
  
    public logout(): void {
      this.storage.removeItem(this.TOKEN_KEY);
    }
  
    public isLoggedIn(): boolean {
      const token = this.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
      } else {
        return false;
      }
    }
  
    public getCurrentUser(): User {
      const token: string | null = this.getToken();
      if (this.isLoggedIn() && token != null) {
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
      } else {
        throw Error;
      }
    }
  }
  