import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { Competition } from '../../../../core/models/competition';



@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './competition-card.component.html',
  styleUrls: ['./competition-card.component.css']
})
export class CompetitionCardComponent implements OnInit, OnDestroy {
  @Input() data!: Competition;

  countdown: string = '00:00:00:00';
  private interval: any;

  ngOnInit(): void {
    console.log('Received data:AAA', this.data);
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCountdown(): void {
    const targetDate = new Date(this.data.date).getTime(); // Use this.data instead of this.competition

    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(this.interval);
        this.countdown = '00:00:00:00';
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.countdown = `${this.padZero(days)}:${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      }
    }, 1000);
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
