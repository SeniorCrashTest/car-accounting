import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarInterface } from '../types/car.interface';
import { map } from 'rxjs/operators';

const url = 'https://car-accounting-father-default-rtdb.firebaseio.com/list'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	cars: CarInterface[] = [];

  constructor(private http: HttpClient) { }
	
//CREATE---------------------------------------------
	createData(car: CarInterface) {
		return this.http.post<CarInterface>(`${url}.json`, car);
	}
	
//READ-----------------------------------------------
getData() {
  return this.http.get<{ [key: string]: CarInterface }>(`${url}.json`)
    .pipe(
      map(responseData => {
        const carsArray: CarInterface[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            carsArray.push({ ...responseData[key], id: key });
          }
        }
        return carsArray;
      })
    );
}

//UPDATE--------------------------------------------
updateData(car: CarInterface, id: string) {
  return this.http.put(`${url}/${id}.json`, car);
}
	
	//DELETE------------------------------------------
	deleteData(id: string) {
		return this.http.delete(`${url}/${id}.json`);
	}
	
}