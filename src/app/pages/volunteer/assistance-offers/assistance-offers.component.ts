import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
export class AssistanceOffersComponent {
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
    this.http
      .get<AssistanceOffer[]>(
        `http://localhost:8080/api/assistanceoffers/user/${userId}`,
      )
      .subscribe((assistanceOffers) => {
        this.assistanceOffers = assistanceOffers;
      });
  }
}
