import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { DataService } from '../shared/data.service';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let service: UserService;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(UserService);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should use the username from service', () => {
    expect(service.user.name).toEqual(component.user.name);
  });

  it('should display the username if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toContain(
      component.user.name
    );
  });

  it('should not display the username if user is not logged in', () => {
    expect(compiled.querySelector('p').textContent).not.toContain(
      component.user.name
    );
  });

  it('should fetch data sucessfully', async () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails').and.returnValue(
      Promise.resolve('data')
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('data');
    });
  });

  it('should fetch data sucessfully with fakeAsync', fakeAsync(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let component = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn<DataService>(dataService, 'getDetails').and.returnValue(
      Promise.resolve('data')
    );
    fixture.detectChanges();
    
    tick();
    expect(component.data).toBe('data');
  }));
});
