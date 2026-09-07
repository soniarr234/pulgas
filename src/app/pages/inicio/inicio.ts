import { Component, OnInit, OnDestroy } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { PROGRAMACION } from '../../data/programacion';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Navbar],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css'],
})
export class Inicio implements OnInit, OnDestroy {
  proximoDia: any;

  cuentaAtras = '';
  mensajeCuentaAtras = '';

  private intervalo?: number;

  ngOnInit(): void {
    this.actualizarProgramacion();
    this.actualizarCuentaAtras();

    this.intervalo = window.setInterval(() => {
      this.actualizarProgramacion();
      this.actualizarCuentaAtras();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  private actualizarProgramacion(): void {
    const hoy = new Date();

    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;

    if (mes < 9) {
      this.proximoDia = PROGRAMACION[0];

      return;
    }

    if (mes > 9) {
      this.proximoDia = PROGRAMACION[PROGRAMACION.length - 1];

      return;
    }

    const evento = PROGRAMACION.find((p) => p.dia >= dia);

    this.proximoDia = evento ?? PROGRAMACION[PROGRAMACION.length - 1];
  }

  private actualizarCuentaAtras(): void {
    const ahora = new Date();

    const inicioMensaje = new Date(
      2026,
      8, // septiembre
      11,
      10,
      0,
      0
    );

    const objetivo = new Date(
      2026,
      8, // septiembre
      11,
      17,
      30,
      0
    );

    if (ahora >= inicioMensaje) {
      this.mensajeCuentaAtras =
        'Hoy se bebe, hoy se gasta, hoy se fuma como un rasta, si Dios lo permite';
    } else {
      this.mensajeCuentaAtras = 'Calentando motores';
    }

    const diferencia = objetivo.getTime() - ahora.getTime();

    if (diferencia <= 0) {
      this.cuentaAtras = '00d 00h 00m 00s';

      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
      (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    this.cuentaAtras = `${dias}d ${horas}h ${minutos}m`;
  }
}
