import { Component, OnInit } from '@angular/core';
import { VenueService } from '../venue.service';
import { Venue } from '../venue.model';
import { EventsService } from 'src/app/events/events.service';

@Component({
	selector: 'app-venue-list',
	templateUrl: './venue-list.component.html',
	styleUrls: [ './venue-list.component.css' ]
})
export class VenueListComponent implements OnInit {
	venues: Venue[] = [];
	page: number = 1;
	venueSelected: string;

	constructor(private venueService: VenueService, private eventsService: EventsService) {}

	ngOnInit() {
		this.venues = this.venueService.getVenues();
		this.venueService.venuesChanged.subscribe(venues => (this.venues = venues));
		this.venueService.pageChanged.subscribe(num => (this.page = num));
		this.venueService.venueSelected.subscribe(venue => (this.venueSelected = venue));
	}

	getLatitude(venue) {
		let lat = venue.location.latitude.replace(/,/g, '.');
		return parseFloat(lat);
	}

	getLongitude(venue) {
		let lng = venue.location.longitude.replace(/,/g, '.');
		return parseFloat(lng);
	}

	selectVenue(venue) {
		this.venueService.setSelectedVenue(venue);
	}
}
