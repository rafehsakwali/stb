import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RendezVousService, RendezVous } from '../admin/rendezvous.service';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, RouterLink]
})
export class AdminComponent implements OnInit, AfterViewInit {
  rendezVousList: RendezVous[] = [];
  now: Date = new Date();

  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  private dataLoaded = false;

  constructor(private rdvService: RendezVousService) {}

  ngOnInit(): void {
    this.rdvService.getAll().subscribe({
      next: (data) => {
        this.rendezVousList = data;
        this.dataLoaded = true;
        this.tryCreateChart();
      },
      error: (err) => console.error(err)
    });
  }

  ngAfterViewInit(): void {
    this.tryCreateChart();
  }

  isPast(date: string): boolean {
    return new Date(date) < new Date();
  }

  private tryCreateChart() {
    // créer le chart seulement si canvas et données sont prêts
    if (this.myChart && this.dataLoaded) {
      const counts: { [key: string]: number } = {};
      this.rendezVousList.forEach(rdv => {
        const date = new Date(rdv.dateRendezVous).toLocaleDateString();
        counts[date] = (counts[date] || 0) + 1;
      });

      const labels = Object.keys(counts);
      const data = Object.values(counts);

      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de RDV',
            data: data,
            borderColor: '#1f6029',
            backgroundColor: 'rgba(31, 96, 41, 0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          }
        }
      };

      if (this.chart) this.chart.destroy();
      this.chart = new Chart(this.myChart.nativeElement, config);
    }
  }
}
