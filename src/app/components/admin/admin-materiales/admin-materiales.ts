import { Component, ChangeDetectorRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  ClaveMaterial,
  MATERIALES,
  MATERIALES_MAX_BYTES,
  MaterialesService,
  MaterialModo,
} from '../../../services/materiales.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-materiales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-materiales.html',
  styleUrls: ['./admin-materiales.css'],
})
export class AdminMaterialesComponent implements OnInit {
  private materialesService = inject(MaterialesService);
  private sanitizer = inject(DomSanitizer);
  private cdr = inject(ChangeDetectorRef);
  readonly toastService = inject(ToastService);

  readonly maxBytes = MATERIALES_MAX_BYTES;
  readonly materiales = MATERIALES;
  readonly claves: ClaveMaterial[] = MATERIALES.map((m) => m.clave);

  readonly cargando = signal(true);
  readonly guardando = signal(false);
  readonly subiendo = signal(false);
  readonly error = signal('');
  readonly activo = signal<ClaveMaterial>('guia');
  readonly puedeAdministrar = signal(false);

  /** Copia de la configuración guardada, para detectar cambios y descartar. */
  private original: Record<ClaveMaterial, any> | null = null;

  modo: MaterialModo = 'pdf';
  titulo = '';
  descripcion = '';
  contenido = '';
  url = '';

  readonly tienePdf = signal(false);
  readonly pdfPreviewUrl = signal<SafeResourceUrl | null>(null);

  get activoMeta() {
    return MATERIALES.find((m) => m.clave === this.activo()) ?? MATERIALES[0];
  }

  async ngOnInit(): Promise<void> {
    this.puedeAdministrar.set(this.materialesService.canManage());
    await this.cargar();
  }

  private async cargar(): Promise<void> {
    this.cargando.set(true);
    this.error.set('');

    this.original = await this.materialesService.getAll();
    this.aplicarAlFormulario(this.activo());
    await this.refrescarPdf();

    this.cargando.set(false);
    this.cdr.detectChanges();
  }

  private aplicarAlFormulario(clave: ClaveMaterial): void {
    const config = this.original?.[clave];
    if (!config) return;
    this.modo = config.modo;
    this.titulo = config.titulo;
    this.descripcion = config.descripcion;
    this.contenido = config.contenido;
    this.url = config.url;
  }

  /** Cambia de material y recarga su formulario y PDF. */
  async cambiarMaterial(clave: ClaveMaterial): Promise<void> {
    this.activo.set(clave);
    this.aplicarAlFormulario(clave);
    await this.refrescarPdf();
    this.cdr.detectChanges();
  }

  private async refrescarPdf(): Promise<void> {
    this.pdfPreviewUrl.set(null);
    const clave = this.activo();
    const existe = await this.materialesService.tienePdf(clave);
    this.tienePdf.set(existe);

    if (existe) {
      const { url, error } = await this.materialesService.getPdfSignedUrl(clave);
      if (error) {
        this.error.set('No se pudo generar la vista previa del PDF: ' + (error.message || ''));
      } else if (url) {
        this.pdfPreviewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
      }
    }
    this.cdr.detectChanges();
  }

  cambiarModo(modo: MaterialModo): void {
    this.modo = modo;
  }

  /** Indica si el formulario difiere de la configuración guardada. */
  get hayCambios(): boolean {
    const base = this.original?.[this.activo()];
    if (!base) return false;
    return (
      base.modo !== this.modo ||
      base.titulo !== this.titulo ||
      base.descripcion !== this.descripcion ||
      base.contenido !== this.contenido ||
      base.url !== this.url
    );
  }

  async guardar(): Promise<void> {
    if (!this.puedeAdministrar() || this.guardando()) return;

    if (this.modo === 'url' && this.url.trim() && !/^https?:\/\//i.test(this.url.trim())) {
      this.error.set('La URL debe comenzar con http:// o https://');
      return;
    }

    this.guardando.set(true);
    this.error.set('');

    const { error } = await this.materialesService.save(this.activo(), {
      modo: this.modo,
      titulo: this.titulo,
      descripcion: this.descripcion,
      contenido: this.contenido,
      url: this.url,
    });

    if (error) {
      this.error.set('No se pudo guardar: ' + (error.message || 'desconocido'));
      this.toastService.error('No se pudo guardar el material');
    } else {
      this.toastService.success('Material guardado correctamente');
      this.original = await this.materialesService.getAll();
      this.aplicarAlFormulario(this.activo());
    }

    this.guardando.set(false);
    this.cdr.detectChanges();
  }

  descartar(): void {
    this.aplicarAlFormulario(this.activo());
    this.error.set('');
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.subiendo.set(true);
    this.error.set('');

    const { error } = await this.materialesService.uploadPdf(this.activo(), file);
    if (error) {
      this.error.set('No se pudo cargar el PDF: ' + (error.message || 'desconocido'));
      this.toastService.error('No se pudo cargar el PDF');
    } else {
      this.toastService.success('PDF cargado correctamente');
      await this.refrescarPdf();
    }

    this.subiendo.set(false);
    input.value = '';
    this.cdr.detectChanges();
  }

  async eliminarPdf(): Promise<void> {
    if (!this.puedeAdministrar() || this.subiendo()) return;
    this.subiendo.set(true);
    this.error.set('');

    const { error } = await this.materialesService.removePdf(this.activo());
    if (error) {
      this.error.set('No se pudo eliminar el PDF: ' + (error.message || 'desconocido'));
      this.toastService.error('No se pudo eliminar el PDF');
    } else {
      this.toastService.success('PDF eliminado');
      await this.refrescarPdf();
    }

    this.subiendo.set(false);
    this.cdr.detectChanges();
  }

  formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}
