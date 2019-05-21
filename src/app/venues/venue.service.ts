import { Injectable } from '@angular/core';
import venueJSON from '../../assets/data.source/establishment-data.json';
import { Venue } from './venue.model.js';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VenueService {
	venues: Venue[] = venueJSON;
	venuesChanged = new Subject<Venue[]>();
	pageChanged = new Subject<number>();
	venueSelected = new Subject<any>();

	constructor() {}

	getVenues() {
		return [ ...this.venues ];
	}

	getCities() {
		const cities: string[] = [];
		this.venues.forEach(venue => {
			if (!cities.includes(venue.location.city)) {
				cities.push(venue.location.city);
			}
		});
		return cities;
	}

	filterVenues(filterBy, value) {
		if (filterBy === 'name') {
			this.venuesChanged.next(
				this.getVenues().filter(venue => {
					return venue.title.toLowerCase().includes(value.toLowerCase());
				})
			);
		} else if (filterBy === 'city') {
			this.venuesChanged.next(
				this.getVenues().filter(venue => {
					return value.includes(venue.location.city);
				})
			);
		} else if (filterBy === 'startYear') {
			this.venuesChanged.next(
				this.getVenues().filter(venue => {
					if (venue.dates.startdate) {
						return this.getYear(venue.dates.startdate) === value;
					}
				})
			);
		} else {
			this.venuesChanged.next(
				this.getVenues().filter(venue => {
					return venue.location.zipcode === value;
				})
			);
		}
	}

	resetVenues() {
		this.venuesChanged.next(this.venues);
	}

	getYear(date) {
		return date.slice(6);
	}

	setSelectedVenue(venue) {
		this.venueSelected.next(venue.trcid);
	}
}
