import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemessasComponent } from './remessas.component';

describe('UsuariosComponent', () => {
  let component: RemessasComponent;
  let fixture: ComponentFixture<RemessasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemessasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemessasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
