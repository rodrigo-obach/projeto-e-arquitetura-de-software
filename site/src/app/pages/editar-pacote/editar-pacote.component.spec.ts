import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPacoteComponent } from './editar-pacote.component';

describe('EditarRemessaComponent', () => {
  let component: EditarPacoteComponent;
  let fixture: ComponentFixture<EditarPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPacoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
