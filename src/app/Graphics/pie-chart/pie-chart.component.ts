import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType, Plugin } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  data: ChartData<'doughnut'> = {
    labels: ['Inconveniente', 'Sugerencia', 'Reclamo'],
    datasets: [{
      data: [30, 50, 20],
      backgroundColor: ['#00a86b', '#50c878', '#023020'],
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverOffset: 14
    }]
  };

  centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.save();
      const text = 'Por Categorías';
      ctx.font = 'bold 18px Cascadia Code';
      ctx.fillStyle = '#023020';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
      ctx.restore();
    }
  };

  options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#000',
          font: {
            family: 'Cascadia Code',
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#023020',
        bodyColor: '#000',
        borderColor: '#00a86b',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value} casos`;
          }
        }
      }
    }
  };

  plugins = [this.centerTextPlugin];
}