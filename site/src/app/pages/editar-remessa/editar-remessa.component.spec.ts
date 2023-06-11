import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRemessaComponent } from './editar-remessa.component';

describe('EditarRemessaComponent', () => {
  let component: EditarRemessaComponent;
  let fixture: ComponentFixture<EditarRemessaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRemessaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRemessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
