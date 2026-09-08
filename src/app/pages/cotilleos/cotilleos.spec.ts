import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cotilleos } from './cotilleos';

describe('Cotilleos', () => {
  let component: Cotilleos;
  let fixture: ComponentFixture<Cotilleos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cotilleos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cotilleos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
