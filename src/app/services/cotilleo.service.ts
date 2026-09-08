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

  async getCotilleos() {

    console.log('Consultando cotilleos...');
  
    const { data, error } =
      await this.supabaseService.supabase
        .from('cotilleos')
        .select('*')
        .order('fecha', {
          ascending: false
        });
  
        console.log(
          'DATA:',
          JSON.stringify(data, null, 2)
        );
    console.log('ERROR:', error);
  
    if (error) {
      throw error;
    }
  
    return data;
  
  }
}