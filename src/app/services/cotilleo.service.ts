import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CotilleoService {

  constructor(
    private supabaseService: SupabaseService
  ) {}

  async getCotilleos() {

    const { data, error } =
      await this.supabaseService.supabase
        .from('cotilleos')
        .select('*')
        .order('fecha', {
          ascending: false
        });

    if (error) {
      throw error;
    }

    return data;
  }

}