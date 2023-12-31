import { Component } from '@angular/core';

import { faHouseCrack } from '@fortawesome/free-solid-svg-icons';

import {
  faPhone,
  faMessage,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faHouseCrack = faHouseCrack;
  faPhone = faPhone;
  faMessage = faMessage;
  faLocationDot = faLocationDot;
}
