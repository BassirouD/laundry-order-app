import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private hub?: signalR.HubConnection;

  private _messages = new Subject<any>();
  messages$ = this._messages.asObservable();

  constructor() { }

  start(token: string) {
    this.hub = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5251/hubs/notifications', {
          accessTokenFactory: () => token
        })
        .withAutomaticReconnect()
        .build();

    this.hub.on('notify', (msg) => {
      this._messages.next(msg);
    });

    return this.hub.start();
  }

  stop() { return this.hub?.stop(); }
}
