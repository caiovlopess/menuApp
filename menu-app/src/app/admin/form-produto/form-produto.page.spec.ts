import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProdutoPage } from './form-produto.page';

describe('FormProdutoPage', () => {
  let component: FormProdutoPage;
  let fixture: ComponentFixture<FormProdutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
