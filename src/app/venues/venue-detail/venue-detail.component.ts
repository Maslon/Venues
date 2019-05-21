import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Venue } from '../venue.model';

@Component({
	selector: 'app-venue-detail',
	templateUrl: './venue-detail.component.html',
	styleUrls: [ './venue-detail.component.css' ]
})
export class VenueDetailComponent implements OnInit {
	venue: Venue;

	constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

	ngOnInit() {
		this.venue = this.data.venue;
	}
}
