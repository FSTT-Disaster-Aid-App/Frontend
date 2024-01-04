import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class SkillsComponent {
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
    this.http
      .get<any[]>(`http://localhost:8080/api/skills/user/${this.userId}`)
      .subscribe((skills) => {
        this.skills = skills;
      });
  }
  addSkill(): void {
    this.http
      .post('http://localhost:8080/api/skills', this.newSkillForm.value)
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
      this.http
        .delete(`http://localhost:8080/api/skills/${skillId}`)
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
