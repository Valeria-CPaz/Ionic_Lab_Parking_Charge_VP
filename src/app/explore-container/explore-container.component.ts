import { Component, OnInit, Input } from '@angular/core';
import { ParkedCar } from 'src/app/models/parked-car';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  // @Input() name: string;

  runningTotal = 0;
  minimumCharge = 2;

  listOfCharges: ParkedCar[] = [];

  directionsName: string = 'Type Name';
  directionsHours: string = 'Type Hours';

  selectedRegistration: string = '';
  selectedHours: number;

  constructor() { }

  ngOnInit(): void {}

  CalculateCharge(): void {

    if (isNaN(this.selectedHours) || this.selectedHours <= 0) {
      return;

    }


    if (this.selectedRegistration?.length == 0) {
      return;
    }

    if (this.listOfCharges.filter(charge => charge.registration == this.selectedRegistration).length > 0) {

      return;
    }

    const currentCharge = this.CalculateParkingCharge(this.selectedHours)
    this.runningTotal += currentCharge;
    let newCar = {
      registration: this.selectedRegistration,
      hoursParked: this.selectedHours,
      parkingCharge: currentCharge,
      runningTotal: this.runningTotal
    };

    this.listOfCharges.push(newCar);

  }

  CalculateParkingCharge(hours: number): number {

    let partialCharge = .5;
    if (hours <= 3) return  this.minimumCharge;

    let totalCharge =  ((hours-3) * partialCharge) + this.minimumCharge ;

    return totalCharge <= 10 ? totalCharge : 10;

  }


  ResetButton(): void {

    this.runningTotal = 0;
    this.listOfCharges = [];
    this.selectedRegistration = '';

  }

}
