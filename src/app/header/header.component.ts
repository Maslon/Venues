import { Component, OnInit } from '@angular/core';
import { VenueService } from '../venues/venue.service';
import { NgForm } from '@angular/forms';
import { EventsService } from '../events/events.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	filterVenueBy: string;
	filtereventBy: string;
	cities: string[];

	constructor(private venueService: VenueService, private eventsService: EventsService) {}

	ngOnInit() {
		this.cities = this.venueService.getCities();
	}

	onFilterVenues(form: NgForm) {
		this.venueService.filterVenues(form.value.filter, form.value.filterValue);
		this.eventsService.showNearbyEvents.next();
		form.reset();
	}

	onFilterEvents(form: NgForm) {
		this.eventsService.filterEvents(form.value.filterEvent, form.value.filterEventValue);
		form.reset();
	}

	onResetFilter() {
		this.venueService.resetVenues();
	}
}
