import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SessionService } from './session-service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    @Inject(HttpClient) public http: HttpClient,
    @Inject(SessionService) public sessionService: SessionService
  ) { }

  async postAuth(url: string, body: any, headers: HttpHeaders): Promise<HttpResponse<any>> {
    headers = headers.set("Authorization", this.sessionService.authorization);
    return this.post(url, body, headers);
  }

  async getAuth(url: string, headers: HttpHeaders) {
    headers = headers.set("Authorization", this.sessionService.authorization);
    this.get(url, headers);
  }

  async post(url: string, body: any, headers: HttpHeaders): Promise<HttpResponse<any>> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(url, body, {
          headers,
          observe: 'response'
        })
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get(url: string, headers: HttpHeaders) {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(url, {
          headers,
          observe: 'response'
        })
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
