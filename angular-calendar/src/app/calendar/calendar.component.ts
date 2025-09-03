import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  today: string = new Date().toDateString();
  currentDate: Date = new Date();
  currentWeek: Date[] = [];
  selectedYear: number;
  selectedMonth: number;
  selectedWeek: number = 1; // Initialize the property

  years: number[] = [];
  months: { value: number; name: string }[] = [];
  weeksInMonth: number[] = [];

  constructor() {
    this.selectedYear = this.currentDate.getFullYear();
    this.selectedMonth = this.currentDate.getMonth() + 1;
    this.populateYears();
    this.populateMonths();
  }

  ngOnInit(): void {
    this.updateCalendar();
  }

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  populateMonths(): void {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    this.months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, name: monthNames[i] }));
  }

  updateCalendar(): void {
    this.populateWeeksInMonth();
    const today = new Date();
    const currentWeekNumber = this.getWeekNumber(today);

    if (this.selectedYear === today.getFullYear() && this.selectedMonth === today.getMonth() + 1) {
        this.selectedWeek = currentWeekNumber;
    } else if (!this.weeksInMonth.includes(this.selectedWeek)) {
        this.selectedWeek = this.weeksInMonth[0] || 1;
    }

    this.generateWeekDays();
  }

  populateWeeksInMonth(): void {
    const weeks = new Set<number>();
    const firstDay = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    const lastDay = new Date(this.selectedYear, this.selectedMonth, 0);

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        weeks.add(this.getWeekNumber(new Date(d)));
    }
    this.weeksInMonth = Array.from(weeks).sort((a, b) => a - b);
  }

  generateWeekDays(): void {
    this.currentWeek = [];
    const firstDayOfYear = new Date(this.selectedYear, 0, 1);
    const daysSinceFirstDay = (this.selectedWeek - 1) * 7;
    const firstDayOfWeekTimestamp = firstDayOfYear.getTime() + daysSinceFirstDay * 86400000;

    let firstDayOfWeek = new Date(firstDayOfWeekTimestamp);

    // Adjust to Monday of that week
    const day = firstDayOfWeek.getDay();
    const diff = firstDayOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(firstDayOfWeek.setDate(diff));

    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        this.currentWeek.push(day);
    }
  }

  getWeekNumber(d: Date): number {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }

  onDateChange(): void {
    this.updateCalendar();
  }

  onWeekChange(): void {
    this.generateWeekDays();
  }
}
