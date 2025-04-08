import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicCalculatorService } from '../../services/basic-calculator.service';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  expression = '';
  result: number | null = null;
  isDark = true;
  private calcService = inject(BasicCalculatorService);

  append(val: string) {
    this.expression += val;
  }

  clear() {
    this.expression = '';
    this.result = null;
  }

  calculate() {
    if (!this.expression) return;
    this.calcService.calculate(this.expression).subscribe({
      next: res => this.result = res.result,
      error: () => this.result = NaN
    });
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme', this.isDark);
    document.body.classList.toggle('light-theme', !this.isDark);
  }

  openHistory() {
    alert('History feature coming soon!'); 
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  closeApp() {
    alert('Close feature is disabled in browsers.');
  }
}
