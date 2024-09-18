export function exportCSV(selectedItems: any[], fileName: string): void {
    const csvData = [];
    const csvFields = Object.keys(selectedItems[0]);

    csvData.push('\uFEFF' + csvFields.join(';'));

    selectedItems.forEach(obj => {
        const values = csvFields.map(field => obj[field]);
        csvData.push(values.join(';'));
    });

    const csvBlob = new Blob([csvData.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvBlob);
    const link = document.createElement('a');

    link.setAttribute('href', csvURL);
    link.setAttribute('download', fileName);
    link.click();
}

export function exportCSVMapping(selectedItems: any[], fileName: string, mapping: { [key: string]: string }): void {
    const csvFields = Object.keys(mapping);
    const csvData = [getCSVHeader(csvFields)];
  
    selectedItems.forEach(obj => {
      const row = getCSVRow(obj, csvFields);
      // Adiciona a linha ao CSV apenas se não estiver vazia
      if (row.split(';').some(field => field.trim() !== '')) {
        csvData.push(row);
      }
    });
  
    csvData[0] = getCSVHeader(Object.values(mapping));
    downloadCSV(csvData, fileName);
}

function getCSVHeader(csvFields: string[]): string {
    return '\uFEFF' + csvFields.join(';');
  }
  
  function getCSVRow(obj: any, csvFields: string[]): string {
    const values = csvFields.map(field => obj[field]);
    return values.join(';');
  }
  
  function downloadCSV(csvData: string[], fileName: string): void {
    const csvBlob = new Blob([csvData.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
  
    link.setAttribute('href', csvURL);
    link.setAttribute('download', fileName);
    link.click();
  }
  