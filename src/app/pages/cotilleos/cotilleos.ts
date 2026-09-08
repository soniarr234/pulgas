// pages/cotilleos/cotilleos.ts
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../../components/navbar/navbar';
import { CotilleoService } from '../../services/cotilleo.service';

@Component({
  selector: 'app-cotilleos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar
  ],
  templateUrl: './cotilleos.html',
  styleUrls: ['./cotilleos.css'],
})
export class Cotilleos implements OnInit {

  cotilleos: any[] = [];

  nuevoCotilleo = '';

  mostrarComentarios = false;

  cotilleoSeleccionado: any = null;

  nuevoComentario = '';

  constructor(
    private cotilleoService: CotilleoService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await this.cargarCotilleos();

  }

  async cargarCotilleos() {

    this.cotilleos =
      await this.cotilleoService.getCotilleos();

    console.log(
      'TOTAL',
      this.cotilleos.length
    );

    this.cdr.detectChanges();

  }

  async publicar() {

    if (!this.nuevoCotilleo.trim()) {
      return;
    }

    await this.cotilleoService.crearCotilleo(
      this.nuevoCotilleo,
      'Sonia'
    );

    this.nuevoCotilleo = '';

    await this.cargarCotilleos();

  }

  contarReacciones(
    cotilleo: any,
    tipo: string
  ): number {
  
    return (
      cotilleo.cotilleo_reacciones
        ?.filter(
          (r: any) =>
            r.tipo === tipo
        )
        .length ?? 0
    );
  
  }

  async reaccionar(
    cotilleo: any,
    tipo: string
  ) {
  
    await this.cotilleoService.reaccionar(
      cotilleo.id,
      tipo,
      'Sonia'
    );
  
    await this.cargarCotilleos();
  
  }

  contarComentarios(
    cotilleo: any
  ): number {
  
    return (
      cotilleo.cotilleo_comentarios
        ?.length ?? 0
    );
  
  }

  abrirComentarios(
    cotilleo: any
  ) {
  
    this.cotilleoSeleccionado =
      cotilleo;
  
    this.mostrarComentarios = true;
  
  }

  cerrarComentarios() {

    this.mostrarComentarios = false;
  
  }

  async publicarComentario() {

    if (!this.nuevoComentario.trim()) {
      return;
    }
  
    await this.cotilleoService.crearComentario(
      this.cotilleoSeleccionado.id,
      this.nuevoComentario,
      'Sonia'
    );
  
    this.nuevoComentario = '';
  
    await this.cargarCotilleos();
  
    this.cotilleoSeleccionado =
      this.cotilleos.find(
        c => c.id === this.cotilleoSeleccionado.id
      );
  
  }

}