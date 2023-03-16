import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HttpService } from './services/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
		
	displayedColumns: string[] = ['sign', 'model', 'appointment', 'comeDate', 'outDate', 'actions'];
	dataSource!: MatTableDataSource<any>;
	
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private dialog: MatDialog, private http: HttpService) {}

	ngOnInit(): void {
		this.fetchData()
	}

	private fetchData(): void {
		this.http.getData().subscribe({
			next: (res: any) => {
				this.dataSource = new MatTableDataSource(res);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			error: err => console.log(err)
		})
	}

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

	createProduct(): void {
			this.dialog.open(DialogComponent, {
			width: '30%'
		}).afterClosed().subscribe(res => {
			console.log(res);
			this.fetchData();
		});
	}

	updateProduct(row: any): void {
		this.dialog.open(DialogComponent, {
			width: '30%',
			data: row
		}).afterClosed().subscribe(res => {
			console.log(res);
			this.fetchData();
		});
	}

	deleteProduct(id: string): void {
		this.http.deleteData(id).subscribe({
			next: res => {
				console.log('Delete succsesfully')
				this.fetchData()
			},
			error: err => console.log(err)
		});
	}
}
