import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface AssistanceOffer {
  id?: string;
  assistanceRequestId: string;
  userId: string;
  status: string;
  dateOfferMade: string;
  dateOfferAcceptedOrRejected: string;
}

@Component({
  selector: 'app-assistance-offers',
  templateUrl: './assistance-offers.component.html',
  styleUrls: ['./assistance-offers.component.scss'],
})
export class AssistanceOffersComponent implements OnInit {
  assistanceOffers: AssistanceOffer[] = [];
  userId: number | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch userId from localStorage
    this.userId = Number(localStorage.getItem('userId'));

    if (this.userId) {
      this.loadAssistanceOffers(this.userId);
    }
  }

  loadAssistanceOffers(userId: number): void {
    const gatewayUrl = environment.gatewayUrl;

    this.http
      .get<AssistanceOffer[]>(
        `${gatewayUrl}/api/volunteer/assistanceoffers/user/${userId}`,
      )
      .subscribe((assistanceOffers) => {
        this.assistanceOffers = assistanceOffers;
      });
  }
}
