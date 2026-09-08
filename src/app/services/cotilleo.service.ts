// services/cotilleo.service.ts

import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Cotilleo } from '../models/cotilleo.model';

@Injectable({
  providedIn: 'root',
})
export class CotilleoService {

  constructor(
    private supabaseService: SupabaseService
  ) {}

  async getCotilleos(): Promise<any[]> {

    const { data, error } =
      await this.supabaseService.supabase
        .from('cotilleos')
        .select(`
          *,
          cotilleo_reacciones(*),
          cotilleo_comentarios(*)
        `)
        .order('fecha', {
          ascending: false
        });

    console.log('DATA:', data);
    console.log('ERROR:', error);

    if (error) {
      throw error;
    }

    return data ?? [];

  }

  async crearCotilleo(
    texto: string,
    usuario: string
  ) {

    return await this.supabaseService.supabase
      .from('cotilleos')
      .insert([
        {
          texto,
          usuario,
          anio: 2026
        }
      ]);

  }

  async reaccionar(
    cotilleoId: number,
    tipo: string,
    usuario: string
  ) {

    return await this.supabaseService.supabase
      .from('cotilleo_reacciones')
      .insert([
        {
          cotilleo_id: cotilleoId,
          tipo,
          usuario
        }
      ]);

  }

  async getComentarios(
    cotilleoId: number
  ) {
  
    const { data, error } =
      await this.supabaseService.supabase
        .from('cotilleo_comentarios')
        .select('*')
        .eq('cotilleo_id', cotilleoId)
        .order('fecha', {
          ascending: true
        });
  
    if (error) {
      throw error;
    }
  
    return data ?? [];
  
  }

  async crearComentario(
    cotilleoId: number,
    comentario: string,
    usuario: string
  ) {
  
    return this.supabaseService.supabase
      .from('cotilleo_comentarios')
      .insert([
        {
          cotilleo_id: cotilleoId,
          comentario,
          usuario
        }
      ]);
  
  }

}