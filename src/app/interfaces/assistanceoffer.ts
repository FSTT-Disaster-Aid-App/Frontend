import { Aidtype } from './aidtype';
import { Donation } from './donation';

export interface AssistanceOffer {
  assistanceRequestId: string;
  userId: string;
  status: string;
  dateOfferMade: string;
  dateOfferAcceptedOrRejected: string | null;
  aidTypes: Aidtype[];
  donations: Donation[];
}
