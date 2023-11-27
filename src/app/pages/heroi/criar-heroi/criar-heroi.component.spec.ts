import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarHeroiComponent } from './criar-heroi.component';

describe('CriarHeroiComponent', () => {
  let component: CriarHeroiComponent;
  let fixture: ComponentFixture<CriarHeroiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarHeroiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
