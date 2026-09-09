import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener
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
    const datos = await this.cotilleoService.getCotilleos();
    this.cotilleos = datos.map(c => ({ 
      ...c, 
      mostrarMenu: false,
      editando: false,        
      textoEditado: c.texto   
    }));
    this.cdr.detectChanges();
  }

  /* ACTIVA EL CAMPO DE TEXTO DIRECTAMENTE EN LA TARJETA */
  activarEdicion(cotilleo: any) {
    cotilleo.mostrarMenu = false;
    cotilleo.textoEditado = cotilleo.texto; 
    cotilleo.editando = true;
    this.cdr.detectChanges();
  }

  /* ENVÍA LA ACTUALIZACIÓN A SUPABASE EVITANDO EL DOBLE CLIC */
  async guardarEdicionInline(event: Event, cotilleo: any) {
    event.stopPropagation(); 
    if (!cotilleo.textoEditado || !cotilleo.textoEditado.trim()) return;

    try {
      await this.cotilleoService.actualizarCotilleo(cotilleo.id, cotilleo.textoEditado.trim());
      cotilleo.texto = cotilleo.textoEditado.trim();
      cotilleo.editando = false;
      await this.cargarCotilleos(); 
    } catch (error) {
      console.error('Error al editar inline:', error);
      alert('No se pudo guardar la edición.');
    }
  }

  /* GESTIÓN DEL DESPLEGABLE DE TRES PUNTOS */
  toggleMenu(event: Event, cotilleoSeleccionado: any) {
    event.stopPropagation(); 
    this.cotilleos.forEach(c => {
      if (c.id !== cotilleoSeleccionado.id) {
        c.mostrarMenu = false;
      }
    });
    cotilleoSeleccionado.mostrarMenu = !cotilleoSeleccionado.mostrarMenu;
    this.cdr.detectChanges();
  }

  @HostListener('document:click', [])
  closeAllMenus() {
    this.cotilleos.forEach(c => {
      if (!c.editando) {
        c.mostrarMenu = false;
      }
    });
    this.cdr.detectChanges();
  }

  async publicar(event: Event) {
    event.stopPropagation(); 
    if (!this.nuevoCotilleo.trim()) return;

    try {
      await this.cotilleoService.crearCotilleo(this.nuevoCotilleo, 'Sonia');
      this.nuevoCotilleo = '';
      await this.cargarCotilleos(); 
    } catch (error) {
      console.error('Error al publicar:', error);
      alert('No se pudo publicar el cotilleo.');
    }
  }

  async borrarCotilleo(cotilleo: any) {
    cotilleo.mostrarMenu = false; 
    const verificado = confirm('¿Seguro que quieres borrar este cotilleo de la peña?');
    if (!verificado) return;

    try {
      await this.cotilleoService.eliminarCotilleo(cotilleo.id);
      await this.cargarCotilleos();
    } catch (error) {
      console.error('Error al borrar:', error);
      alert('No se pudo borrar el cotilleo.');
    }
  }

  contarReacciones(cotilleo: any, tipo: string): number {
    return (
      cotilleo.cotilleo_reacciones
        ?.filter((r: any) => r.tipo === tipo)
        .length ?? 0
    );
  }

  async reaccionar(event: Event, cotilleo: any, tipo: string) {
    event.stopPropagation(); 
    
    const usuarioActual = 'Sonia';
    if (!cotilleo.cotilleo_reacciones) {
      cotilleo.cotilleo_reacciones = [];
    }

    const indiceReaccion = cotilleo.cotilleo_reacciones.findIndex(
      (r: any) => r.tipo === tipo && r.usuario === usuarioActual
    );

    const yaReaccionado = indiceReaccion !== -1;

    if (yaReaccionado) {
      cotilleo.cotilleo_reacciones.splice(indiceReaccion, 1);
    } else {
      cotilleo.cotilleo_reacciones.push({
        cotilleo_id: cotilleo.id,
        tipo: tipo,
        usuario: usuarioActual
      });
    }
    
    this.cdr.detectChanges();

    try {
      if (yaReaccionado) {
        await this.cotilleoService.eliminarReaccion(cotilleo.id, tipo, usuarioActual);
      } else {
        await this.cotilleoService.reaccionar(cotilleo.id, tipo, usuarioActual);
      }
      const datosActualizados = await this.cotilleoService.getCotilleos();
      const clonActualizado = datosActualizados.find((c: any) => c.id === cotilleo.id);
      if (clonActualizado) {
        cotilleo.cotilleo_reacciones = clonActualizado.cotilleo_reacciones || [];
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error asíncrono en reacciones:', error);
      await this.cargarCotilleos();
    }
  }

  contarComentarios(cotilleo: any): number {
    return cotilleo.cotilleo_comentarios?.length ?? 0;
  }

  /* ABRE EL MODAL Y ASEGURA EL MAPEO DE COMENTARIOS */
  abrirComentarios(cotilleo: any) {
    this.cotilleoSeleccionado = cotilleo;
    if (!this.cotilleoSeleccionado.cotilleo_comentarios) {
      this.cotilleoSeleccionado.cotilleo_comentarios = [];
    }
    this.mostrarComentarios = true;
    this.cdr.detectChanges();
  }

  cerrarComentarios() {
    this.mostrarComentarios = false;
    this.cotilleoSeleccionado = null;
    this.nuevoComentario = '';
    this.cdr.detectChanges();
  }

  /* ==========================================================================
     ENVÍO DE COMENTARIOS SIN CONFLICTOS DE DOBLE CLIC
     ========================================================================== */
  async publicarComentario(event: Event) {
    event.stopPropagation(); // Evita interferencias con el listener general del documento
    
    if (!this.nuevoComentario || !this.nuevoComentario.trim()) return;

    try {
      // 1. Guardamos la respuesta en Supabase
      await this.cotilleoService.crearComentario(
        this.cotilleoSeleccionado.id,
        this.nuevoComentario.trim(),
        'Sonia'
      );

      this.nuevoComentario = ''; // Limpiamos el editor de texto

      // 2. Traemos los datos frescos del servidor para mantener la consistencia completa
      const datosActualizados = await this.cotilleoService.getCotilleos();
      
      // 3. Actualizamos la colección principal de posts
      this.cotilleos = datosActualizados.map(c => ({ 
        ...c, 
        mostrarMenu: false,
        editando: false,        
        textoEditado: c.texto   
      }));

      // 4. Buscamos el post actual dentro de los nuevos datos y actualizamos la vista del modal inline
      const postActualizado = this.cotilleos.find(
        c => c.id === this.cotilleoSeleccionado.id
      );

      if (postActualizado) {
        this.cotilleoSeleccionado = postActualizado;
      }

      // 5. Solicitamos a Angular renderizar los nuevos comentarios de inmediato
      this.cdr.detectChanges();

    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
      alert('No se pudo publicar tu respuesta.');
    }
  }
}
