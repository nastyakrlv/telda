import { Routes } from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {ToDoListComponent} from "./to-do-list/to-do-list.component";

export const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'to-do/:date', component: ToDoListComponent }
];
