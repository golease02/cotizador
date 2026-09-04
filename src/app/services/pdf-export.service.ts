import { Injectable, inject } from '@angular/core';
import type html2canvasLib from 'html2canvas';
import type { jsPDF } from 'jspdf';
import { ThemeService } from './theme.service';

type Html2Canvas = typeof html2canvasLib;
type JsPDFClass = typeof jsPDF;

/**
 * Servicio único de exportación a PDF.
 * Carga html2canvas y jsPDF de forma diferida (solo cuando el usuario
 * pulsa "Descargar PDF"), manteniendo el código pesado fuera del bundle inicial.
 */
@Injectable({
    providedIn: 'root'
})
export class PdfExportService {

    private theme = inject(ThemeService);

    public async exportToPdf(elementId: string, fileName: string = 'cotizacion'): Promise<void> {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Elemento con ID "${elementId}" no encontrado.`);
            return;
        }

        const previousTheme = this.theme.theme();
        this.theme.theme.set('light');

        try {
            // Carga diferida: html2canvas (~200KB) y jsPDF (~350KB) solo aquí
            const [html2canvas, jsPDF] = await Promise.all([
                import('html2canvas').then(m => m.default as unknown as Html2Canvas),
                import('jspdf').then(m => m.jsPDF as unknown as JsPDFClass),
            ]);

            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                allowTaint: false,
                width: element.scrollWidth,
                height: element.scrollHeight
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${fileName}.pdf`);

        } catch (error) {
            console.error('Error al generar el PDF:', error);
        } finally {
            this.theme.theme.set(previousTheme);
        }
    }
}