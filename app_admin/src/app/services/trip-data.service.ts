import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Trip } from "../models/trip";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";
import { BROWSER_STORAGE } from "../storage";

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

    private url = 'http://localhost:3000/api/trips';

    // Helper method to get token from storage
    private getAuthToken(): string | null {
      return this.storage.getItem('travlr-token');
    }
    private createAuthHeaders(): HttpHeaders {
      const token = this.getAuthToken();
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
      

    getTrips() : Observable<Trip[]> {
      //const headers = this.createAuthHeaders();
      return this.http.get<Trip[]>(this.url);
      //, {headers});
    }

    addTrip(formData: Trip) : Observable<Trip> {
      //const headers = this.createAuthHeaders();
      return this.http.post<Trip>(this.url,formData);
      //, { headers});
    }

    getTrip(tripCode: string) : Observable<Trip[]> {
      //console.log('Inside TripData::getTrip');
      //const headers = this.createAuthHeaders();
      return this.http.get<Trip[]>(this.url + '/' + tripCode);
      //, { headers });
    }

    
    updateTrip(formData: Trip) : Observable<Trip> {
      console.log('Inside TripDataService::updateTrips');
      console.log('formData:', formData); 
      console.log('formData.code:', formData.code); 
    
     // const headers = this.createAuthHeaders(); 
     //return this.http.put<Trip>(`${this.url}formData/${formData.code}`); 
      return this.http.put<Trip>(this.url + '/' + formData.code, formData);
    } 

    private handleError(error:any): Promise<any> {
      console.error('Something has gone wrong', error);
      return Promise.reject(error.message || error);
    }

    public login(user: User): Promise<AuthResponse> {
      return this.makeAuthApiCall('login', user);
    }

    public register(user: User): Promise<AuthResponse> {
      return this.makeAuthApiCall('register', user);
    }

    private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
      const url: string = `${'http://localhost:3000/api'}/${urlPath}`;
      return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
    }

  
}