import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LivreService, Livre } from '../../livre.service';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  imports: [CommonModule, RouterLink, MatButtonModule],
})
export class DetailComponent implements OnInit {
  livre?: Livre;

  constructor(private route: ActivatedRoute, private livreService: LivreService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.livreService.getLivreById(id).subscribe(livre => this.livre = livre);
    }
  }
}
