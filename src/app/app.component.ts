import { Component } from '@angular/core';
import { PremiumService } from './services/premium.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  stateOptions = ["NY", "AL", "AK", "Others"];
  state = "";
  age = 0;
  dob = "";
  premium = 0;

  constructor(private premiumService: PremiumService) {

  }

  getPremiumValue() {
    this.premiumService.getPremium(this.dob, this.state, this.age).subscribe((res: { success?: boolean, message?: string, premium?: number }) => {
      if (res && res.success !== false) {
        this.premium = res.premium;
      }
      else {
        alert(res.message);
      }
    })
  }
}
