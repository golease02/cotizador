import { Injectable } from '@angular/core';
import type html2canvasLib from 'html2canvas';
import type { jsPDF } from 'jspdf';

type Html2Canvas = typeof html2canvasLib;
type JsPDFClass = typeof jsPDF;

/**
 * Ancho de render "escritorio" usado al capturar el documento.
 * Evita que los media queries moviles del CSS compacten o recorten la hoja
 * cuando la cotizacion se descarga desde un telefono o tablet.
 */
const DESKTOP_WINDOW_WIDTH = 1280;

/**
 * Ancho canonico de la hoja de cotizacion (equivale al max-width de .official-sheet
 * en quote-breakdown.css). Todos los PDF se generan con esta medida, por lo que el
 * resultado es siempre el mismo sin importar el dispositivo.
 */
const SHEET_RENDER_WIDTH = 1000;

/**
 * Servicio unico de exportacion a PDF.
 * Carga html2canvas y jsPDF de forma diferida (solo cuando el usuario
 * pulsa "Descargar PDF"), manteniendo el codigo pesado fuera del bundle inicial.
 *
 * El documento se renderiza siempre en un iframe oculto con ancho de ventana
 * "escritorio", por lo que el PDF resultante es identico sin importar el
 * dispositivo ni el tema (claro/oscuro) con el que se genero.
 */
@Injectable({
    providedIn: 'root'
})
export class PdfExportService {

    public async exportToPdf(elementId: string, fileName: string = 'cotizacion'): Promise<void> {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Elemento con ID "${elementId}" no encontrado.`);
            return;
        }

        try {
            // Carga diferida: html2canvas (~200KB) y jsPDF (~350KB) solo aqui
            const [html2canvas, jsPDF] = await Promise.all([
                import('html2canvas').then(m => m.default as unknown as Html2Canvas),
                import('jspdf').then(m => m.jsPDF as unknown as JsPDFClass),
            ]);

            const canvas = await this.renderDesktopSnapshot(element, html2canvas);

            // JPEG con calidad 0.85: ~70% mas ligero que PNG sin perdida visual notable
            const imgData = canvas.toDataURL('image/jpeg', 0.85);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
                compress: true,
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${fileName}.pdf`);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    }

    /**
     * Clona el documento en un iframe oculto de ancho "escritorio", espera a que
     * se apliquen los estilos y carguen las imagenes, y captura el clon con
     * html2canvas. Devuelve el canvas generado y limpia el iframe.
     */
    private async renderDesktopSnapshot(
        element: HTMLElement,
        html2canvas: Html2Canvas,
    ): Promise<HTMLCanvasElement> {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.setAttribute('tabindex', '-1');
        iframe.style.position = 'fixed';
        iframe.style.left = '-10000px';
        iframe.style.top = '0';
        iframe.style.width = `${DESKTOP_WINDOW_WIDTH}px`;
        iframe.style.height = '1px';
        iframe.style.border = 'none';
        iframe.style.pointerEvents = 'none';
        document.body.appendChild(iframe);

        try {
            // El iframe arranca en about:blank, por lo que su documento esta disponible
            // de inmediato y no depende de eventos de carga del navegador.
            const doc = iframe.contentDocument;
            if (!doc) throw new Error('No se pudo acceder al documento de captura');

            doc.open();
            doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
            doc.close();

            // 1) Copiar los estilos de la aplicacion (Angular los inyecta como hojas del documento)
            document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
                doc.head.appendChild(node.cloneNode(true));
            });

            // 2) Base del documento de captura: fondo blanco, sin margenes
            const baseStyle = doc.createElement('style');
            baseStyle.textContent = 'html, body { margin: 0; padding: 0; background: #ffffff; }';
            doc.head.appendChild(baseStyle);

            // 3) Clonar la hoja y fijarle el ancho "escritorio"
            const clone = element.cloneNode(true) as HTMLElement;
            clone.style.width = `${SHEET_RENDER_WIDTH}px`;
            clone.style.minWidth = '0';
            clone.style.maxWidth = 'none';
            // La vista en movil reduce la hoja con zoom; el PDF siempre se captura a escala real.
            clone.style.zoom = '1';
            clone.style.margin = '0';
            clone.style.borderRadius = '0';
            clone.style.boxShadow = 'none';
            doc.body.appendChild(clone);

            // 4) Esperar el layout y la carga de imagenes del clon (ej. logo Go Lease)
            await new Promise<void>((resolve) => setTimeout(resolve, 0));
            const images = Array.from(clone.querySelectorAll('img'));
            await Promise.all(
                images.map((img) =>
                    img.complete && img.naturalWidth > 0
                        ? Promise.resolve()
                        : new Promise<void>((resolve) => {
                              const done = () => resolve();
                              img.addEventListener('load', done, { once: true });
                              img.addEventListener('error', done, { once: true });
                              setTimeout(done, 5000); // no bloquear la descarga indefinidamente
                          }),
                ),
            );

            // 5) Capturar el clon dentro del iframe (viewport = escritorio)
            return await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                allowTaint: false,
                windowWidth: DESKTOP_WINDOW_WIDTH,
                windowHeight: clone.scrollHeight,
                scrollX: 0,
                scrollY: 0,
                width: clone.scrollWidth,
                height: clone.scrollHeight,
            });
        } finally {
            iframe.remove();
        }
    }
}