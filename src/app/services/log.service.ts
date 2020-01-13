import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of'

import { Log } from '../models/Log/Log';

@Injectable()
export class LogService {

  logs: Log[];
  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource =  new BehaviorSubject<Boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor(){
    // this.logs = [
    //   {id: '1', text:'Rohit Kanade', date: new Date('12/12/2018 12:20:33')},
    //   {id: '2', text:'Sagar Kanade', date: new Date('1/23/2019 10:45:20')},
    //   {id: '3', text:'Piu Kanade', date: new Date('4/10/2020 11:13:37')},
    // ];
    this.logs = [];
  }

  getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') === null ){
      this.logs = [];
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log){
    this.logSource.next(log);
  }

  addLog(log: Log){
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    });

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }

}
