import { NgModule } from '@angular/core';
import {
	MatSelectModule,
	MatInputModule,
	MatFormFieldModule,
	MatCardModule,
	MatButtonModule,
	MatRadioModule,
	MatDialogModule
} from '@angular/material';

@NgModule({
	imports: [
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatButtonModule,
		MatRadioModule,
		MatDialogModule
	],
	exports: [
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatButtonModule,
		MatRadioModule,
		MatDialogModule
	]
})
export class MaterialModule {}
