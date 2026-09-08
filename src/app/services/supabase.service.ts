import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  supabase = createClient(
    'https://lxcplmrvcdutkrupyohi.supabase.com',
    'sb_publishable__Z7kOVsN6eh_fOW7tuM97Q_lamsOr6d'
  );

}