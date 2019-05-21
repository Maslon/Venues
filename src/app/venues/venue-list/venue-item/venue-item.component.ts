import { Component, OnInit, Input } from '@angular/core';
import { Venue } from '../../venue.model';
import { EventsService } from '../../../events/events.service';
import { MatDialog } from '@angular/material';
import { VenueDetailComponent } from '../../venue-detail/venue-detail.component';

@Component({
	selector: 'app-venue-item',
	templateUrl: './venue-item.component.html',
	styleUrls: [ './venue-item.component.css' ]
})
export class VenueItemComponent implements OnInit {
	@Input() venue: Venue;
	@Input() venueSelected: string;

	constructor(private eventsService: EventsService, private dialog: MatDialog) {}

	ngOnInit() {}

	onVenueClick() {
		this.eventsService.getNearbyEvents(this.venue);
	}

	onMoreInfo() {
		this.dialog.open(VenueDetailComponent, {
			data: {
				venue: this.venue
			}
		});
	}
}
