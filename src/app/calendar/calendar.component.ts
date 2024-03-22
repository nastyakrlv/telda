import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
  MatDatepickerModule
} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Router} from "@angular/router";
import {ITodoList} from "../todo.interface";


@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendar!: MatCalendar<Date>;

  selectedDate: Date | null;
  startDate: Date | null;

  constructor(
    private router: Router,
    private _renderer: Renderer2
  ) {
    this.selectedDate = null;
    this.startDate = null;
  }

  public ngOnInit() {
    const savedDate: string | null = localStorage.getItem('selectedDate');

    if (savedDate) {
      this.startDate = new Date(savedDate);
      this.selectedDate = new Date(savedDate);
    }
  }

  public ngAfterViewInit() {
    this.updateCalendar();

    const monthPrevBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.mat-calendar-previous-button');
    const monthNextBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.mat-calendar-next-button');

    this._renderer.listen(monthPrevBtn, 'click', (event) => {
      this.updateCalendar();
    });

    this._renderer.listen(monthNextBtn, 'click', () => {
      this.updateCalendar();
    });

  }

  public handleMonthSelected(event: any): void {
    this.updateCalendar();
  }

  public updateCalendar(): void {
    setTimeout(() => {
      const cells: HTMLButtonElement[] = Array.from(document.querySelectorAll<HTMLButtonElement>('.mat-calendar .mat-calendar-body-cell'));

      cells.forEach((c: HTMLButtonElement) => {
        this._renderer.listen(c,'dblclick', () => {
          if (this.selectedDate) {
            this.router.navigate(['/to-do', this.selectedDate.toLocaleDateString()])
          }
        });
      });
    })

  }

  public dateClass(): MatCalendarCellClassFunction<Date> {
    return (date: Date): MatCalendarCellCssClasses => {
      const dateString: string = date.toLocaleDateString();
      const todoList = JSON.parse(localStorage.getItem('todos') || '[]').find((list: ITodoList) => list.date === dateString);
      return todoList && todoList.todo.length > 0 ? 'has-todo' : '';
    };
  }

  public saveSelectedDate(selectedDate: Date | null) {
    if (selectedDate) {
      localStorage.setItem('selectedDate', selectedDate.toISOString());
    }
  }
}
