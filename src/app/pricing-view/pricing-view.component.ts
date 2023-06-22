import {Component, Input, OnInit} from '@angular/core';
import {Plan} from "../services/app-model";

@Component({
  selector: 'app-pricing-view',
  templateUrl: './pricing-view.component.html',
  styleUrls: ['./pricing-view.component.scss']
})
export class PricingViewComponent implements OnInit {

  @Input()
  plans:Array<Plan> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
