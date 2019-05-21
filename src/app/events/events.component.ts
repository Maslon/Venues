import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { MyEvent } from './event.model';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: [ './events.component.css' ]
})
export class EventsComponent implements OnInit {
	events: MyEvent[];

	constructor(private eventsService: EventsService) {}

	ngOnInit() {
		this.eventsService.showNearbyEvents.subscribe(events => (this.events = events));
	}
}
