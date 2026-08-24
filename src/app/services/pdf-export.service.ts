import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
    providedIn: 'root'
})
export class PdfExportService {

    /**
     * Exporta un elemento HTML a PDF
     * @param elementId - ID del elemento HTML a capturar
     * @param fileName - Nombre del archivo (sin extensión)
     */
    public async exportToPdf(elementId: string, fileName: string = 'cotizacion'): Promise<void> {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Elemento con ID "${elementId}" no encontrado.`);
            return;
        }

        try {
            // Capturar el elemento como canvas
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width * 0.75, canvas.height * 0.75]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.save(`${fileName}.pdf`);

        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    }
}