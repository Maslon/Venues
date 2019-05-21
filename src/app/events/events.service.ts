import { Injectable } from '@angular/core';
import eventJSON from '../../assets/data.source/events-data.json';
import { Subject } from 'rxjs';
import { MyEvent } from './event.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
	events: MyEvent[] = eventJSON;
	showNearbyEvents = new Subject<MyEvent[]>();
	currentEvents: MyEvent[];

	getEvents() {
		return [ ...this.events ];
	}

	getNearbyEvents({ location }) {
		let venueLat = parseFloat(location.latitude.replace(/,/g, '.'));
		let venueLng = parseFloat(location.longitude.replace(/,/g, '.'));
		const events = this.events.filter(({ location }) => {
			let eventLat = parseFloat(location.latitude.replace(/,/g, '.'));
			let eventLng = parseFloat(location.longitude.replace(/,/g, '.'));
			return this.getDistanceFromLatLonInKm(venueLat, venueLng, eventLat, eventLng) < 1;
		});
		const eventsWithDistance = events.map(event => {
			let eventLat = parseFloat(event.location.latitude.replace(/,/g, '.'));
			let eventLng = parseFloat(event.location.longitude.replace(/,/g, '.'));
			return {
				...event,
				distance: this.getDistanceFromLatLonInKm(venueLat, venueLng, eventLat, eventLng)
			};
		});
		eventsWithDistance.sort((a, b) => (a.distance > b.distance ? 1 : -1));
		this.showNearbyEvents.next(eventsWithDistance);
		this.currentEvents = eventsWithDistance;
	}

	getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		const R = 6371; // Radius of the earth in km
		const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
		const dLon = this.deg2rad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // Distance in km
		return d;
	}

	deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	filterEvents(filterBy, value) {
		if (filterBy === 'eventName') {
			this.showNearbyEvents.next(
				this.currentEvents.filter((event: MyEvent) => {
					return event.title.toLowerCase().includes(value.toLowerCase());
				})
			);
		} else {
			this.showNearbyEvents.next(
				this.currentEvents.filter((event: MyEvent) => {
					if (event.dates.startdate) {
						return this.getYearAndMonth(event.dates.startdate) === value;
					} else if (event.dates.singles) {
						return event.dates.singles.some(date => this.getYearAndMonth(date) === value);
					}
				})
			);
		}
	}

	getYearAndMonth(date) {
		return date.slice(3);
	}

	eventsShown() {
		if (this.currentEvents.length === 0) {
			return `No events in the vicinity`;
		} else {
			return `Events:`;
		}
	}
}
