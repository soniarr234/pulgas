// pages/cotilleos/cotilleos.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de tener esta importación
import { Navbar } from '../../components/navbar/navbar';
import { CotilleoService } from '../../services/cotilleo.service';
import { Cotilleo } from '../../models/cotilleo.model';

@Component({
  selector: 'app-cotilleos',
  standalone: true,
  imports: [Navbar, CommonModule], // Asegúrate de que CommonModule esté aquí
  templateUrl: './cotilleos.html',
  styleUrls: ['./cotilleos.css'],
})
export class Cotilleos implements OnInit {

  cotilleos: Cotilleo[] = [];
  cargando = true;

  constructor(private cotilleoService: CotilleoService) {}

  // pages/cotilleos/cotilleos.ts
async ngOnInit() {
  this.cargando = true; // Forzamos el estado inicial de carga

  try {
    const datos = await this.cotilleoService.getCotilleos();
    // Validamos que los datos existan antes de asignarlos
    this.cotilleos = datos ? datos : []; 
    console.log('TOTAL ASIGNADO:', this.cotilleos.length);
  } catch (error) {
    console.error('ERROR COTILLEOS', error);
  } finally {
    // Usamos un micro-timeout para asegurarnos de que Angular 
    // ejecute la actualización fuera del hilo bloqueado por Chrome
    setTimeout(() => {
      this.cargando = false;
    }, 0);
  }
}

}
