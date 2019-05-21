import { Component, OnInit, Input } from '@angular/core';
import { MyEvent } from '../event.model';

@Component({
	selector: 'app-event-item',
	templateUrl: './event-item.component.html',
	styleUrls: [ './event-item.component.css' ]
})
export class EventItemComponent implements OnInit {
	@Input() event: MyEvent;
	shortDatesArr;

	constructor() {}

	ngOnInit() {
		this.shortenArr();
		console.log(this.event);
	}

	formatDistance() {
		let distance = Math.trunc(this.event.distance * 1000);
		return `Distance: ${distance} meters`;
	}

	getStartDate() {
		return this.event.dates.startdate ? `Starts: ${this.event.dates.startdate}` : null;
	}

	getEndDate() {
		return this.event.dates.enddate ? `Ends: ${this.event.dates.enddate}` : null;
	}

	shortenArr() {
		if (this.event.dates.singles && this.event.dates.singles.length > 5) {
			this.shortDatesArr = this.event.dates.singles.splice(5);
		} else {
			this.shortDatesArr = this.event.dates.singles;
		}
	}
}
