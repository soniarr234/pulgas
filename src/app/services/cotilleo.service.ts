import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Cotilleo } from '../models/cotilleo.model';

@Injectable({
  providedIn: 'root',
})
export class CotilleoService {

  constructor(private supabaseService: SupabaseService) {}

  /* TRAER TODOS LOS USUARIOS DISPONIBLES DE LA PEÑA */
  async getUsuariosPeña(): Promise<any[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('usuarios_pena') // Asegúrate de crear esta tabla en Supabase con la columna 'nombre'
      .select('nombre')
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data ?? [];
  }
  

  async getCotilleos(): Promise<any[]> {
    const { data, error } = await this.supabaseService.supabase
        .from('cotilleos')
        .select(`
          *,
          cotilleo_reacciones(*),
          cotilleo_comentarios(*)
        `)
        .order('fecha', { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  async crearCotilleo(texto: string, usuario: string) {
    return await this.supabaseService.supabase
      .from('cotilleos')
      .insert([{ texto, usuario, anio: 2026 }]);
  }

  async actualizarCotilleo(id: number, nuevoTexto: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('cotilleos')
      .update({ texto: nuevoTexto })
      .eq('id', id);

    if (error) throw error;
    return data;
  }

  async eliminarCotilleo(id: number) {
    const { data, error } = await this.supabaseService.supabase
      .from('cotilleos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }

  async reaccionar(cotilleoId: number, tipo: string, usuario: string) {
    return await this.supabaseService.supabase
      .from('cotilleo_reacciones')
      .insert([{ cotilleo_id: cotilleoId, tipo, usuario }]);
  }

  async getComentarios(cotilleoId: number) {
    const { data, error } = await this.supabaseService.supabase
        .from('cotilleo_comentarios')
        .select('*')
        .eq('cotilleo_id', cotilleoId)
        .order('fecha', { ascending: true });

    if (error) throw error;
    return data ?? [];
  }

  async crearComentario(cotilleoId: number, comentario: string, usuario: string) {
    return this.supabaseService.supabase
      .from('cotilleo_comentarios')
      .insert([{ cotilleo_id: cotilleoId, comentario, usuario }]);
  }

  /* NUEVA SOLICITUD: ELIMINAR REACCIÓN EXISTENTE */
  async eliminarReaccion(cotilleoId: number, tipo: string, usuario: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('cotilleo_reacciones')
      .delete()
      .eq('cotilleo_id', cotilleoId)
      .eq('tipo', tipo)
      .eq('usuario', usuario);

    if (error) throw error;
    return data;
  }
  
}
