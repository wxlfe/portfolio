import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { SkillComponent } from './skill/skill.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full' },
  {
    path: 'projects/:slug',
    component: ProjectComponent,
    pathMatch: 'full',
  },
  { path: 'skills', component: SkillsComponent, pathMatch: 'full' },
  {
    path: 'skills/:slug',
    component: SkillComponent,
    pathMatch: 'full',
  },
  { path: 'experience', component: ExperienceComponent, pathMatch: 'full' },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];
