import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Cotilleo } from '../../models/cotilleo.model';
import { CotilleoService } from '../../services/cotilleo.service';

@Component({
  selector: 'app-cotilleos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cotilleos.html',
  styleUrl: './cotilleos.css',
})
export class Cotilleos implements OnInit {

  cotilleos: Cotilleo[] = [];

  nuevoCotilleo = '';

  constructor(
    private cotilleoService: CotilleoService
  ) {}

  async ngOnInit() {

    await this.cargarCotilleos();

  }

  async cargarCotilleos() {

    const { data, error } =
      await this.cotilleoService.obtenerCotilleos();

    if (error) {
      console.error(error);
      return;
    }

    this.cotilleos = data ?? [];

  }

  async publicar() {

    if (!this.nuevoCotilleo.trim()) {
      return;
    }

    const { error } =
      await this.cotilleoService.crearCotilleo(
        this.nuevoCotilleo,
        'Anónimo'
      );

    if (error) {
      console.error(error);
      return;
    }

    this.nuevoCotilleo = '';

    await this.cargarCotilleos();

  }

}