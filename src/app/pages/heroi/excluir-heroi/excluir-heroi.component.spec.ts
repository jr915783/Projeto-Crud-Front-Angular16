import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirHeroiComponent } from './excluir-heroi.component';

describe('ExcluirPensamentoComponent', () => {
  let component: ExcluirHeroiComponent;
  let fixture: ComponentFixture<ExcluirHeroiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirHeroiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
