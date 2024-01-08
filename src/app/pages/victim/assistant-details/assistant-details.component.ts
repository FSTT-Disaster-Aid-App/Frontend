import {Component, OnInit} from '@angular/core';
import {AssistantrequestsService} from "../../../services/victim/assistantrequests.service";
import {ActivatedRoute} from "@angular/router";
import {SkillsService} from "../../../services/victim/skills.service";
import {AitypeService} from "../../../services/victim/aitype.service";
import {Assistancerequest} from "../../../interfaces/assistancerequest";
import {Skills} from "../../../interfaces/skills";
import {Aidtype} from "../../../interfaces/aidtype";

@Component({
  selector: 'app-assistant-details',
  templateUrl: './assistant-details.component.html',
  styleUrls: ['./assistant-details.component.scss']
})
export class AssistantDetailsComponent implements OnInit{
  assistantRequestId: string | null = null;
  assistantRequestDetails: any; // Update the type based on your data structure
  assistanceRequests: Assistancerequest[] = [];
  skills: Skills[] = [];
  aidtype: Aidtype[] = [];

  constructor(
    private route: ActivatedRoute,
    private assistantservice: AssistantrequestsService,private skillsservice: SkillsService,private aidtypesrvc:AitypeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.assistantRequestId = params.get('id');
      if (this.assistantRequestId) {
        this.loadAssistantRequestDetails(this.assistantRequestId);
      }
    });
  }

  loadAssistantRequestDetails(id: string): void {
    this.assistantservice.getAssistantRequestById(id).subscribe(
      (response) => {
        this.assistantRequestDetails = response.data; // Update based on your data structure
      },
      (error) => {
        console.error('Error fetching Assistant Request details:', error);
      }
    );
  }
  getAllAssistanceRequests(): void {
    this.assistantservice.getAllItems().subscribe(
      (response) => {
        this.assistanceRequests = response.data;
      },
      (error) => {
        console.error('Error fetching Assistance Requests:', error);
      }
    );
  }
  getAllSkills(): void {
    this.skillsservice.getAllItems().subscribe(
      (response) => {
        this.skills = response.data;
      },
      (error) => {
        console.error('Error fetching Skills:', error);
      }
    );
  }
  getAllAidtype(): void {
    this.aidtypesrvc.getAllItems().subscribe(
      (response) => {
        this.aidtype= response.data;
      },
      (error) => {
        console.error('Error fetching Skills:', error);
      }
    );
  }

}
