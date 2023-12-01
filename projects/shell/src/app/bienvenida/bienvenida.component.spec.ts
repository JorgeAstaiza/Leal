import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaComponent } from './bienvenida.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BienvenidaComponent', () => {
  let component: BienvenidaComponent;
  let fixture: ComponentFixture<BienvenidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidaComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
