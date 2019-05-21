import { Component } from '@angular/core';
import { VenueService } from './venues/venue.service';
import { EventsService } from './events/events.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'Venues';
	eventsShown: false;

	constructor(private venueService: VenueService, private eventsService: EventsService) {}

	onPageChanged(e) {
		this.venueService.pageChanged.next(e);
		this.eventsService.showNearbyEvents.next();
	}
}
