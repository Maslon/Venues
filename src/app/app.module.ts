import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VenuesComponent } from './venues/venues.component';
import { VenueListComponent } from './venues/venue-list/venue-list.component';
import { VenueItemComponent } from './venues/venue-list/venue-item/venue-item.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { EventsComponent } from './events/events.component';
import { EventItemComponent } from './events/event-item/event-item.component';
import { VenueDetailComponent } from './venues/venue-detail/venue-detail.component';

@NgModule({
	declarations: [
		AppComponent,
		VenuesComponent,
		VenueListComponent,
		VenueItemComponent,
		HeaderComponent,
		MapComponent,
		EventsComponent,
		EventItemComponent,
		VenueDetailComponent
	],
	imports: [
		BrowserModule,
		NgxPaginationModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		AgmCoreModule.forRoot({
			apiKey: '',
			libraries: [ 'geometry' ]
		})
	],
	providers: [],
	bootstrap: [ AppComponent ],
	entryComponents: [ VenueDetailComponent ]
})
export class AppModule {}
