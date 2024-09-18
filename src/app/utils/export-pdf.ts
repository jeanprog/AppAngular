// src/app/utils/pdf-generator.util.ts
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Configurando pdfMake com VFS Fonts
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export function generatePdf(data: any[]) {
  if (data.length === 0) {
    console.error('Nenhum dado para gerar o PDF.');
    return;
  }

  // Extrair cabeçalhos dos objetos
  const headers = Object.keys(data[0]);
  const columnWidths = headers.map(() => 36);

  // Criar o corpo da tabela com cabeçalhos e linhas de dados
  const body = [
    // Cabeçalhos
    headers.map((header) => ({ text: header, style: 'headerCell' })),
    // Linhas
    ...data.map((item: any) =>
      headers.map((header) => ({ text: item[header], style: 'cell' }))
    ),
  ];

  // Definir a estrutura do documento
  const documentDefinition = {
    /*   pageMargins: [60, 10, 10, 60] as [number, number, number, number], */
    content: [
      {
        text: 'Relatório de Franquados',
        style: 'header',
      },
      {
        table: {
          headerRows: 1,
          widths: columnWidths, // Define largura das colunas
          body: body,
        },
        layout: 'lightHorizontalLines',
      },
    ],
    styles: {
      header: {
        fontSize: 12,
        bold: true,

        margin: [0, 0, 0, 2] as [number, number, number, number], // Margens no formato correto
      },
      headerCell: {
        fontSize: 6,
        bold: true,
        margin: [2, 2] as [number, number], // Margens no formato correto
      },
      cell: {
        fontSize: 6,
        margin: [2, 2] as [number, number], // Margens no formato correto
      },
    },
  };

  // Criar e baixar o PDF
  /*  pdfMake.createPdf(documentDefinition).download('relatorioFranqueados.pdf'); */
  pdfMake.createPdf(documentDefinition).open();
}
