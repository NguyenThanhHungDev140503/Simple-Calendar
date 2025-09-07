import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize with the current date', () => {
    const currentDate = new Date();
    fixture.detectChanges();
    expect(component.selectedYear).toBe(currentDate.getFullYear());
    expect(component.selectedMonth).toBe(currentDate.getMonth() + 1);
  });

  it('should calculate the correct week number', () => {
    const date1 = new Date('2024-01-01'); // Monday, Week 1
    const date2 = new Date('2024-12-31'); // Tuesday, Week 1 of 2025
    const date3 = new Date('2023-10-26'); // Thursday, Week 43
    expect(component.getWeekNumber(date1)).toBe(1);
    expect(component.getWeekNumber(date2)).toBe(1);
    expect(component.getWeekNumber(date3)).toBe(43);
  });

  it('should populate weeks in the selected month', () => {
    component.selectedYear = 2024;
    component.selectedMonth = 9; // September
    fixture.detectChanges();
    component.populateWeeksInMonth();
    // September 2024 has weeks 36, 37, 38, 39, 40
    expect(component.weeksInMonth).toEqual([36, 37, 38, 39, 40]);
  });

  it('should generate the correct days for a selected week', () => {
    component.selectedYear = 2024;
    component.selectedWeek = 39;
    fixture.detectChanges();
    component.generateWeekDays();
    expect(component.currentWeek.length).toBe(7);
    // Monday, September 23, 2024
    expect(component.currentWeek[0].toDateString()).toBe(new Date('2024-09-23').toDateString());
    // Sunday, September 29, 2024
    expect(component.currentWeek[6].toDateString()).toBe(new Date('2024-09-29').toDateString());
  });

  it('should call updateCalendar on date change', () => {
    spyOn(component, 'updateCalendar');
    component.onDateChange();
    expect(component.updateCalendar).toHaveBeenCalled();
  });

  it('should call generateWeekDays on week change', () => {
    spyOn(component, 'generateWeekDays');
    component.onWeekChange();
    expect(component.generateWeekDays).toHaveBeenCalled();
  });
});
