import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreDetailsPage } from './explore-details.page';

describe('Tab2Page', () => {
  let component: ExploreDetailsPage;
  let fixture: ComponentFixture<ExploreDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreDetailsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
