import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHeroiComponent } from './lista-heroi.component';

describe('ListaHeroiComponent', () => {
  let component: ListaHeroiComponent;
  let fixture: ComponentFixture<ListaHeroiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaHeroiComponent]
    });
    fixture = TestBed.createComponent(ListaHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
