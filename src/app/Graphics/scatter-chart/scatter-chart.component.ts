// scatter-chart.component.ts
import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, isPlatformBrowser  } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './scatter-chart.component.html',
  //styleUrl: './scatter-chart.component.scss'
})
export class ScatterChartComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  data: ChartData<'line', {x: string, y: number}[]> =  {
    datasets: [{
      label: 'Tendencia por Hora',
      data: [
        { x: '06:00', y: 3 },
        { x: '08:00', y: 6 },
        { x: '10:00', y: 9 },
        { x: '12:00', y: 12 },
        { x: '14:00', y: 15 },
        { x: '16:00', y: 1 },
        { x: '18:00', y: 4 },
        { x: '20:00', y: 5 },
      ],
      backgroundColor: 'rgba(0, 168, 107, 0.2)',
      borderColor: '#007a4d',
      borderWidth: 2.5,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#007a4d',
      pointBorderColor: '#004d2a',
      fill: true,
      tension: 0.35
    }]
  };
  
  options: ChartOptions<'line'> = {
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
          title: (context) => `Hora: ${context[0].label}`,
          label: (context) => `Cantidad: ${context.parsed.y}`
        },
        backgroundColor: '#f9f9f9',
        titleColor: '#007a4d',
        bodyColor: '#000',
        borderColor: '#007a4d',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        type: 'category', // <- esta línea es clave
        title: {
          display: true,
          text: 'Hora del Caso',
          color: '#000',
          font: {
            family: 'Rowdies',
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#000',
          font: {
            family: 'Cascadia Code',
            size: 12
          }
        },
        grid: {
          color: '#e5e5e5'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad',
          color: '#000',
          font: {
            family: 'Rowdies',
            size: 16,
            weight: 'bold'
          }
        },
        beginAtZero: true,
        ticks: {
          color: '#000',
          font: {
            family: 'Cascadia Code',
            size: 12
          }
        },
        grid: {
          color: '#e5e5e5'
        }
      }
    }
  };  
}  