
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Assistancerequest } from "../../interfaces/assistancerequest";
import { environment } from "../../../environments/environment";

import { AssistantrequestsService } from "../../services/victim/assistantrequests.service";
import {SkillsService} from "../../services/victim/skills.service";
import {Skills} from "../../interfaces/skills";
import {AitypeService} from "../../services/victim/aitype.service";
import {Aidtype} from "../../interfaces/aidtype";

@Component({
  selector: 'app-victim',
  templateUrl: './victim.component.html',
  styleUrls: ['./victim.component.scss']
})
export class VictimComponent implements OnInit {
  assistanceRequests: Assistancerequest[] = [];
  skills: Skills[] = [];
  aidtype: Aidtype[] = [];
  private gatewayUrl = environment.gatewayUrl;
  private baseUrl = `${this.gatewayUrl}/victim/AssistantRequests`;
  showAddForm: boolean = false;
  newAssistanceRequest: Assistancerequest = {
    id: undefined,  // add this line
    state: 'PENDING',
    date: new Date(),
    userId: '',
    skills: [],
    aidType: [],
    location: {id: '', rue: '', ville:''},  // Assuming Location has id and name properties
    description: '',
  };

  constructor(private http: HttpClient, private assistantservice: AssistantrequestsService,private skillsservice: SkillsService,private aidtypesrvc:AitypeService) {}


    ngOnInit(): void {
    const userId = localStorage.getItem('userId');

      if (userId) {
        this.getAllAssistantRequests();
      } else {
        console.error('User ID is missing in localStorage');
      }

  }
  getAllAssistantRequests(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      console.log( localStorage.getItem('userId'));
      this.assistantservice.getAllItems(userId).subscribe(
          (response) => {
            this.assistanceRequests = response.data;
          },
          (error) => {
            console.error('Error fetching Assistance Requests:', error);
          }
      );
    } else {
      console.error('User ID is missing in localStorage');
    }
  }




  deleteIte(id: string | undefined): void {
    this.assistantservice.deleteItem(id).subscribe(
      () => {
        this.getAllAssistantRequests();
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }

  addAssistantRequest(): void {
    // Récupérer l'ID de l'utilisateur à partir du localStorage
    const userId = localStorage.getItem('userId');

    // Vérifier si l'ID de l'utilisateur est présent
    if (!userId) {
      console.error('User ID is missing in localStorage');
      return;
    }

    // Assigner l'ID de l'utilisateur à la nouvelle demande d'assistance
    this.newAssistanceRequest.userId = userId;

    // Envoi de la requête
    this.assistantservice.postItem(this.newAssistanceRequest).subscribe(
        (response) => {
          console.log('Assistance Request added successfully:', response);
          this.getAllAssistantRequests();
          this.showAddForm = false;

          // Réinitialiser les champs du formulaire
          this.newAssistanceRequest = {
            id: undefined,
            state: 'PENDING',
            date: new Date(),
            userId: '',
            skills: [],
            aidType: [],
            location: { id: '', rue: '', ville: '' },
            description: '',
          };
        },
        (error) => {
          console.error('Error adding Assistance Request:', error);
          // Log the error message received from the server
          console.error('Server error:', error.error);
        }
    );
  }

}
