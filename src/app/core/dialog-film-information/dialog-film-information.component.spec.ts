import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFilmInformationComponent } from './dialog-film-information.component';

describe('DialogFilmInformationComponent', () => {
  let component: DialogFilmInformationComponent;
  let fixture: ComponentFixture<DialogFilmInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFilmInformationComponent]
    });
    fixture = TestBed.createComponent(DialogFilmInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
