import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

interface Skill {
  id?: number;
  name: string;
  userId: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  newSkillForm!: FormGroup;
  userId: number | undefined;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    this.userId = Number(storedUserId);
    this.loadSkills();
    this.newSkillForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      userId: [this.userId],
    });
  }

  loadSkills(): void {
    const gatewayUrl = environment.gatewayUrl;

    this.http
      .get<any[]>(`${gatewayUrl}/api/volunteer/skills/user/${this.userId}`)
      .subscribe((skills) => {
        this.skills = skills;
      });
  }

  addSkill(): void {
    const gatewayUrl = environment.gatewayUrl;

    this.http
      .post(`${gatewayUrl}/api/volunteer/skills`, this.newSkillForm.value)
      .subscribe({
        next: () => {
          this.loadSkills();
          this.newSkillForm.reset();
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }

  deleteSkill(skillId: number | undefined): void {
    if (skillId) {
      const gatewayUrl = environment.gatewayUrl;

      this.http
        .delete(`${gatewayUrl}/api/volunteer/skills/${skillId}`)
        .subscribe({
          next: () => {
            this.loadSkills();
          },
          error: (error) => {
            alert(error.error.message);
          },
        });
    }
  }
}
