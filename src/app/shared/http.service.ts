import { timer as observableTimer,  Observable ,  BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
declare const $: any;

@Injectable()
export class HttpService implements HttpInterceptor {
  public pendingRequests = 0;
  public showLoading = false;
  public loadingChange = new BehaviorSubject(false);

  changeShowLoading(value: boolean): void {
    this.showLoading = value;
    this.loadingChange.next(value);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('In the intercept routine..');
    this.turnOnModal();
    return next.handle(req).pipe(
    // .catch((err, source) => {
    //   console.log('Caught error: ' + err);
    // })
      tap((res: HttpEvent<any>) => {
        // console.log('Response: ' + res);
      }, (err: any) => {
        // console.log('Caught error: ' + err);
      }),
      finalize(() => {
        // console.log('Finally.. delaying, though.');
        // this.turnOffModal();
        const timer = observableTimer(300);
        timer.subscribe(t => {
          this.turnOffModal();
        });
      }));
  }

  public turnOnModal() {
    this.pendingRequests++;
    // console.log('In the turn on: ' + this.pendingRequests);
    if (!this.showLoading) {
      // $('body').spin('modal', '#FFFFFF', 'rgba(51, 51, 51, 0.1)');
      // console.log('Turned on modal');
    }
    this.changeShowLoading(true);
  }

  public turnOffModal() {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }
    // console.log('In the turn off: ' + this.pendingRequests);
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        // $('body').spin('modal', '#FFFFFF', 'rgba(51, 51, 51, 0.1)');
      }
      this.changeShowLoading(false);
      // console.log('Turned off modal');
    }
  }
}
