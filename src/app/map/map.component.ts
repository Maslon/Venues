import { Component, OnInit } from '@angular/core';
import { Venue } from '../venues/venue.model';
import { VenueService } from '../venues/venue.service';
import { EventsService } from '../events/events.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: [ './map.component.css' ]
})
export class MapComponent implements OnInit {
	venues: Venue[];
	events;
	venueSelected;
	lat = 52.368;
	lng = 4.9036;
	page: number = 1;
	zoom: number = 10;

	constructor(private venueService: VenueService, private eventsService: EventsService) {}

	ngOnInit() {
		this.venues = this.venueService.getVenues();
		this.venueService.venuesChanged.subscribe(venues => (this.venues = venues));
		this.eventsService.showNearbyEvents.subscribe(events => (this.events = events));
		this.venueService.pageChanged.subscribe(num => (this.page = num));
		this.venueService.venueSelected.subscribe(venue => (this.venueSelected = venue));
	}

	getLatitude(item) {
		let lat = item.location.latitude.replace(/,/g, '.');
		return parseFloat(lat);
	}

	getLongitude(item) {
		let lng = item.location.longitude.replace(/,/g, '.');
		return parseFloat(lng);
	}

	onMarkerClick(venue) {
		this.eventsService.getNearbyEvents(venue);
		this.venueService.setSelectedVenue(venue);
	}
}
