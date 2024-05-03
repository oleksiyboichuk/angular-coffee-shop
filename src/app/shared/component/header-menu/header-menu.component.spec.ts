import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuComponentComponent } from './header-menu.component';

describe('HeaderMenuComponentComponent', () => {
  let component: HeaderMenuComponentComponent;
  let fixture: ComponentFixture<HeaderMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMenuComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
