import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROGRAMACION } from '../../data/programacion';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-programa',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './programa.html',
  styleUrls: ['./programa.css'],
})
export class Programa {
  mostrarModal = false;

  diaSeleccionado: any = {};

  programacion = PROGRAMACION;

  abrirDia(dia: number) {
    this.diaSeleccionado = this.programacion.find((p) => p.dia === dia);

    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
