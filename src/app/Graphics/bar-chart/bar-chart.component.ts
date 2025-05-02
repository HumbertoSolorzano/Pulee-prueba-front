import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  estados = ['Satisfecho', 'Regular', 'Insatisfecho'];
  cantidades = [120, 60, 30]; // valores simulados

  data: ChartData<'bar'> = {
    labels: this.estados,
    datasets: [{
      label: 'Encuestas S1-2025',
      data: this.cantidades,
      backgroundColor: ['#00a86b', '#c3e6cb', '#f08080'],
      borderRadius: 6,
      barThickness: 40
    }]
  };

  options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            family: 'Cascadia Code',
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Cantidad: ${ctx.parsed.y}`
        },
        backgroundColor: '#fff',
        titleColor: '#00a86b',
        bodyColor: '#000',
        borderColor: '#00a86b',
        borderWidth: 1
      },
      title: {
        display: true,
        text: 'Satisfacción - Semestre 01, 2025',
        color: '#000',
        font: {
          family: 'Rowdies',
          size: 18,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
          font: {
            family: 'Cascadia Code',
            size: 12
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Casos',
          color: '#000',
          font: {
            family: 'Rowdies',
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#000',
          stepSize: 20
        },
        grid: {
          color: '#f0f0f0'
        }
      }
    }
  };

  get total(): number {
    return this.cantidades.reduce((acc, curr) => acc + curr, 0);
  }
}
