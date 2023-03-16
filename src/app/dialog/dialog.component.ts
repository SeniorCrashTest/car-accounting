import { Component, Inject , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../services/http.service';
import { DateAdapter } from '@angular/material/core';



	@Component({
		selector: 'app-dialog',
		templateUrl: './dialog.component.html',
		styleUrls: ['./dialog.component.scss']
	})

export class DialogComponent implements OnInit {

  form!: FormGroup;
	
	constructor(private fb: FormBuilder, private httpService: HttpService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private dateAdapter: DateAdapter<Date>) {
		this.dateAdapter.setLocale('en-GB');
	}

  ngOnInit(): void {
		this.initializeForm()
		this.httpService.getData()
	}

  addProduct(): void {
		if(this.form.invalid) return

		this.httpService.createData(this.form.value)
		.subscribe({
			next: res => {
				console.log('Added product:', res);
				this.form.reset();
				this.dialogRef.close('create');
			},
			error: err => console.log(err)
		})
	}

  updateProduct(): void {
		if(this.form.invalid) return

		this.httpService.updateData(this.form.value, this.editData.id)
		.subscribe({
			next: res => {
				console.log('Updated product:', res);
				this.form.reset()
				this.dialogRef.close('updated');
			},
			error: err => console.log(err)
		})
	}

	private initializeForm(): void {
		this.form = this.fb.group({
			sign: [this.editData?.sign || '', Validators.required],
			model: [this.editData?.model || '', Validators.required],
			appointment: [this.editData?.appointment || '', Validators.required],
			comeDate: [this.editData?.comeDate || '', Validators.required],
			outDate: [this.editData?.outDate || '', Validators.required]
		});
	}
}