import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicCalculatorService, CalculationHistoryItem } from '../../services/basic-calculator.service';


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
  history: CalculationHistoryItem[] = [];
  showHistory = false;
  constructor(private calculatorService: BasicCalculatorService) {}

  append(value: string) {
    if (this.showHistory) {
      this.clearHistoryView();
    }
    this.expression += value;
  }

  clear() {
    this.expression = '';
    this.result = null;
    this.clearHistoryView(); 
  }

  // calculate the current expression
  calculate() {
    if (!this.expression.trim()) return;

    this.calculatorService.calculate(this.expression).subscribe({
      next: (response) => {
        this.result = response.result;
      },
      error: (error) => {
        console.error(error);
        alert('Invalid expression or server error!');
      }
    });
  }
  

  // load calculation history
  loadHistory() {
    this.calculatorService.getHistory().subscribe({
      next: (data) => {
        this.history = data.slice(0,8);
        this.showHistory = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  clearHistoryView() {
    this.showHistory = false;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
