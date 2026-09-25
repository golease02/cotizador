import { Component, effect, inject, signal, untracked } from '@angular/core';
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
export class MaterialComponent {
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

  /** Invalida cargas viejas si el usuario navega entre materiales muy rápido. */
  private request = 0;

  constructor() {
    // `ngOnInit` no se re-dispara cuando cambia el parámetro de la misma ruta
    // (p. ej. editar el hash de /material/pre_fisica a /material/pre_moral):
    // el componente se reutiliza y el contenido quedaría congelado.
    effect(() => {
      const clave = this.clave();
      untracked(() => void this.cargar(clave));
    });
  }

  private normalizar(valor: string | null): ClaveMaterial {
    const clave = valor as ClaveMaterial;
    return MATERIALES.some((m) => m.clave === clave) ? clave : 'guia';
  }

  get meta() {
    return MATERIALES.find((m) => m.clave === this.clave()) ?? MATERIALES[0];
  }

  private async cargar(clave: ClaveMaterial): Promise<void> {
    const request = ++this.request;
    this.cargando.set(true);
    this.error.set('');
    this.config.set(null);
    this.pdfUrl.set(null);

    const config = await this.materialesService.get(clave);
    if (request !== this.request) return;
    this.config.set(config);

    if (config.modo === 'pdf') {
      const { url, error } = await this.materialesService.getPdfSignedUrl(clave);
      if (request !== this.request) return;
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
