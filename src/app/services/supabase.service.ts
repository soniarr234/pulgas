// services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  supabase = createClient(
    'https://fcebvpbmhtnvbvrjdnzf.supabase.co',
    'sb_publishable_qr7mYeXEal3ghnw1L5rViA_SrmEopHZ'
  );

}