/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmitterService } from './emitter.service';
import { EventEmitter } from '@angular/core';
// Actually this is real emitter service, but I just do it for again mention that you should always use stubs
const emitterServiceStub = {
  infoChange: new EventEmitter(),
  isUserSet: new EventEmitter(),

  emitUserSetEvent(isReady) {
    this.isUserSet.emit(isReady);
  },

  getUserSetEmitter() {
    return this.isUserSet;
  },

  emitChangeEvent(info) {
    this.infoChange.emit(info);
  },

  getChangeEmitter() {
    return this.infoChange;
  },
};

describe('EmitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Here you provide what should be used as a service
        { provide: EmitterService, useValue: emitterServiceStub }
      ]
    });
  });

  it('should exist', inject([EmitterService], (service: EmitterService) => {
    expect(service).toBeTruthy();
  }));

  it('should have needed functions', inject([EmitterService], (service: EmitterService) => {
    expect(typeof service.emitUserSetEvent).toEqual('function');
    expect(typeof service.getUserSetEmitter).toEqual('function');
    expect(typeof service.emitChangeEvent).toEqual('function');
    expect(typeof service.getChangeEmitter).toEqual('function');
  }));

  it('should have correct userEmitter', inject([EmitterService], (service: EmitterService) => {
    const em = service.getUserSetEmitter();
    service.emitUserSetEvent('ready');
    em.subscribe((val) => {
      expect(val).toEqual('ready');
    });
  }));

  it('should have correct changeEmitter', inject([EmitterService], (service: EmitterService) => {
    const em = service.getChangeEmitter();
    service.emitChangeEvent('ready');
    em.subscribe((val) => {
      expect(val).toEqual('ready');
    });
  }));
});
