import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'getPhone';
  private orderId: string;
  private url2: string;
  private phoneNumber: string;
  private apiKey: string = 'YlvNjqBbYnIpQCbbB52162IaTnfJ7SnQK8iqpuj9lU0v';
  private message: string;

  sessionIdNanoSim: string;
  apiToken: 'xEC3euCBSSepH7EWorFZ';
  phone: string;
  sms: string;

  time = 0;
  time2 = 0;

  constructor(private appService: AppService,
              private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  getCodeFromRentCode() {
    this.start();
    this.orderId = '';
    this.phoneNumber = '';
    this.message = '';

    this.appService.getOrderId().subscribe(response => {
      this.orderId = response.id;

      console.log(this.orderId, 'orderID');
      this.getPhoneNumber();
      console.log(this.orderId, 'orderID');
      this.getPhone();
    });
  }

  getCodeFromNanoSim() {
    this.start2();
    this.sessionIdNanoSim = '';
    this.phone = '';
    this.sms = '';

    this.appService.getSessionId().subscribe(response => {
      this.sessionIdNanoSim = response.data.session_id;

      console.log(this.sessionIdNanoSim, 'sessionIdNanoSim');
      this.getPhone();
    });
  }

  getPhoneNumber() {
    let interval = setInterval(() => {
      console.log(this.orderId);
      this.url2 = `https://api.rentcode.net/api/v2/order/${this.orderId}/check?apiKey=${this.apiKey}`;
      console.log(this.url2);
      this.http.get<any>(this.url2).subscribe((res) => {
        this.phoneNumber = res.phoneNumber;
        this.phoneNumber = this.split(this.phoneNumber);
        console.log(this.phoneNumber);
        if (res.message != null) {
          this.message = res.message;
          console.log(this.message);
          clearInterval(interval);
        } else {
          setTimeout(() => {
            clearInterval(interval);
            window.location.reload();
          }, 300000);
        }
      });
    }, 5000);
  }

  getPhone() {
    let interval2 = setInterval(() => {
      console.log(this.sessionIdNanoSim);
      this.url2 = `https://access.nanosim.vn/api/ig/code?api_token=xEC3euCBSSepH7EWorFZ&sessionId=${this.sessionIdNanoSim}`;
      console.log(this.url2);
      this.http.get<any>(this.url2).subscribe((res) => {
        if (res.data.phone != null) {
          this.phone = res.data.phone;
          this.phone = this.split(this.phone);
          console.log(this.phone);
          if (res.data.sms != null) {
            this.sms = res.data.sms;
            console.log(this.message);
            clearInterval(interval2);
          } else {
            setTimeout(() => {
              clearInterval(interval2);
              //this.getSessionId()
            }, 300000);
          }
        }
      });
    }, 5000);
  }

  split(value) {
    value = value.toString();
    while (/(\d+)(\d{3})/.test(value)) {
      value = value.replace(/(\d+)(\d{3})/, '$1' + ' ' + '$2');
    }
    return value;
  }

  start() {
    setInterval(() => {
      this.increase();
    }, 1000);
  }

  start2() {
    setInterval(() => {
      this.increase2();
    }, 1000);
  }

  increase() {
    if (this.time < 100) {
      this.time++;
    }
  }

  increase2() {
    if (this.time2 < 100) {
      this.time2++;
    }
  }
}
