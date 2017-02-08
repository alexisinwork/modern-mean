import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {
  // Simple eventEmitter like Node.js Emitter to send/subscribe on events
  infoChange: EventEmitter<any> = new EventEmitter();
  isUserSet: EventEmitter<any> = new EventEmitter();

  constructor() {}
  // Global emit events for all components
  emitUserSetEvent(isReady) {
    this.isUserSet.emit(isReady);
  }
  // Set up an emitter in component
  getUserSetEmitter() {
    return this.isUserSet;
  }

  emitChangeEvent(info) {
    this.infoChange.emit(info);
  }

  getChangeEmitter() {
    return this.infoChange;
  }

}
