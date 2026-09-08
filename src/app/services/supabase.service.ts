// services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  supabase = createClient(
    'https://prriqjvcbzqdmlleksvm.supabase.co',
    'sb_publishable_ZzmdEJEXI47m2Jm61HuWXQ_uW7zS15K'
  );

}