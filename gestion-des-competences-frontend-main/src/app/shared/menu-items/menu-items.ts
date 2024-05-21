import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface Saperator {
  name: string;
  type?: string;
}

export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  expectedRoles: string[];
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  expectedRoles: string[];
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'skillsDashboard',
    name: 'Skills Dashboard',
    type: 'link',
    icon: 'view_list',
    expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER']
  },
  {
    state: '',
    name: 'Settings',
    type: 'sub',
    icon: 'apps',
    expectedRoles: ['ADMIN'],
    children: [
      {state: 'users', name: 'User Configuration', type: 'link', expectedRoles: ['ADMIN']},
      {state: 'roles', name: 'Role Configuration', type: 'link', expectedRoles: ['ADMIN']},
      {state: 'functions', name: 'Function Configuration', type: 'link', expectedRoles: ['ADMIN']},
      {state: 'departments', name: 'Department/Direction Configuration', type: 'link', expectedRoles: ['ADMIN']},
      {state: 'skills', name: 'Skills Configuration', type: 'link', expectedRoles: ['ADMIN']},

    ]
  },

  {
    state: 'skillsEvaluation',
    name: 'Skills Evaluation',
    type: 'link',
    icon: 'assignment',
    expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER', 'USER']
  },
  {
    state: '',
    name: 'Reporting',
    type: 'sub',
    icon: 'insert_chart_outlined',
    expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER'],
    children: [
      {state: 'reporting', name: 'Charts', type: 'subchild', expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER'],
      subchildren:[
        {state: 'overview', name: 'Overview', type: 'link'},
        {state: 'curve', name: 'Over Time', type: 'link'},
        //{state: 'radar', name: 'Radar', type: 'link'}
      ]},
    ]
  },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
