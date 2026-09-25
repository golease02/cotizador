import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  ClaveMaterial,
  MaterialesService,
  MaterialConfig,
  MATERIALES,
} from '../../../services/materiales.service';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './material.html',
  styleUrls: ['./material.css'],
})
export class MaterialComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private materialesService = inject(MaterialesService);
  private sanitizer = inject(DomSanitizer);

  readonly clave = toSignal(
    this.route.paramMap.pipe(map((params) => this.normalizar(params.get('clave')))),
    { initialValue: 'guia' as ClaveMaterial },
  );

  readonly cargando = signal(true);
  readonly config = signal<MaterialConfig | null>(null);
  readonly pdfUrl = signal<SafeResourceUrl | null>(null);
  readonly error = signal('');

  private normalizar(valor: string | null): ClaveMaterial {
    const clave = valor as ClaveMaterial;
    return MATERIALES.some((m) => m.clave === clave) ? clave : 'guia';
  }

  get meta() {
    return MATERIALES.find((m) => m.clave === this.clave()) ?? MATERIALES[0];
  }

  async ngOnInit(): Promise<void> {
    await this.cargar();
  }

  private async cargar(): Promise<void> {
    this.cargando.set(true);
    this.error.set('');

    const clave = this.clave();
    const config = await this.materialesService.get(clave);
    this.config.set(config);

    if (config.modo === 'pdf') {
      const { url, error } = await this.materialesService.getPdfSignedUrl(clave);
      if (error) {
        this.error.set('No se pudo cargar el documento. Intenta de nuevo.');
      } else if (url) {
        this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
      }
    }

    this.cargando.set(false);
  }

  get titulo(): string {
    return this.config()?.titulo || this.meta.etiqueta;
  }

  get descripcion(): string {
    return this.config()?.descripcion || '';
  }

  get contenido(): string {
    return this.config()?.contenido || '';
  }

  get url(): string {
    return this.config()?.url || '';
  }
}
