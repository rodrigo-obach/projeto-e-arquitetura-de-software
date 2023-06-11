import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SemAcessoComponent } from './sem-acesso.component';

describe('SemAcessoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SemAcessoComponent
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(SemAcessoComponent);
    const page = fixture.componentInstance;
    expect(page).toBeTruthy();
  });
});
