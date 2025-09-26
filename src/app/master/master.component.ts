import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MasterService, RendezVous } from './master.service';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-master',
  standalone: true,
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
  imports: [CommonModule, FormsModule, RouterLink] // ⚡ important pour ngModel, ngForm et routerLink
})
export class MasterComponent implements OnInit, AfterViewInit {
  rendezVousList: RendezVous[] = [];
  newRdv: RendezVous = { nomClient: '', telephone: '', vehicule: '', dateRendezVous: '' };
  loading: boolean = false;
  now: Date = new Date();

  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  private dataLoaded = false;

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  ngAfterViewInit(): void {
    this.tryCreateChart();
  }

  loadRendezVous() {
    this.loading = true;
    this.masterService.getRendezVous().subscribe({
      next: (data) => {
        this.rendezVousList = data;
        this.loading = false;
        this.dataLoaded = true;
        this.tryCreateChart();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.masterService.addRendezVous(this.newRdv).subscribe({
      next: (data) => {
        this.rendezVousList.push(data);
        this.newRdv = { nomClient: '', telephone: '', vehicule: '', dateRendezVous: '' };
        form.resetForm();
        this.tryCreateChart();
      },
      error: (err) => console.error(err)
    });
  }

  isPast(date: string): boolean {
    return new Date(date) < new Date();
  }

  private tryCreateChart() {
    if (this.myChart && this.dataLoaded && this.rendezVousList.length > 0) {
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
