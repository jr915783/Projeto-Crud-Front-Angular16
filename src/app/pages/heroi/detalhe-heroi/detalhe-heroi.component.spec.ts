import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheHeroiComponent } from './detalhe-heroi.component';

describe('ExcluirPensamentoComponent', () => {
  let component: DetalheHeroiComponent;
  let fixture: ComponentFixture<DetalheHeroiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheHeroiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
