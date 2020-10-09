import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiKey = 'YlvNjqBbYnIpQCbbB52162IaTnfJ7SnQK8iqpuj9lU0v';
  urlRentcode = `https://api.rentcode.net/api/v2/order/request?apiKey=${this.apiKey}&ServiceProviderId=40&NetworkProvider=1&MaximumSms=2&AllowVoiceSms=false`;

  apiToken: 'xEC3euCBSSepH7EWorFZ';
  urlNano = `https://access.nanosim.vn/api/ig/request?api_token=xEC3euCBSSepH7EWorFZ&serviceId=7`;

  constructor(private httpClient: HttpClient) {
  }

  getOrderId(): Observable<any> {
    return this.httpClient.get<any>(this.urlRentcode);
  }

  getSessionId(): Observable<any> {
    return this.httpClient.get<any>(this.urlNano);
  }
}
