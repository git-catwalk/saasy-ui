import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantUserTableComponent } from './tenant-user-table.component';

describe('TenantUserTableComponent', () => {
  let component: TenantUserTableComponent;
  let fixture: ComponentFixture<TenantUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantUserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
