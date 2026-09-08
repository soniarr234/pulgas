import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CotilleoService } from '../../services/cotilleo.service';

@Component({
  selector: 'app-cotilleos',
  standalone: true,
  imports: [Navbar],
  templateUrl: './cotilleos.html',
  styleUrls: ['./cotilleos.css'],
})
export class Cotilleos implements OnInit {

  cotilleos: any[] = [];

  constructor(
    private cotilleoService: CotilleoService
  ) {}

  async ngOnInit() {

    try {
  
      this.cotilleos =
        await this.cotilleoService.getCotilleos();
  
      console.log(this.cotilleos);
  
    } catch (error) {
  
      console.error(error);
  
    }
  
  }

}