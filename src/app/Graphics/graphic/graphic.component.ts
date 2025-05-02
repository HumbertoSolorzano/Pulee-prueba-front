import { Component} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ScatterChartComponent } from '../scatter-chart/scatter-chart.component';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, PieChartComponent, BarChartComponent, ScatterChartComponent],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})

export class GraphicComponent {
}