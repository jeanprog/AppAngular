export function formatDate(data: string | undefined): string {
    if (!data) {
      return '';
    }
  
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = String(dataObj.getFullYear());
    return `${dia}/${mes}/${ano}`;
  }
  
  export function convertDateTimeToDate(dateTime: string): string {
    const [datePart] = dateTime.split(' ');

    const [day, month, year] = datePart.split('/');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  export function formatDateTime(data: string | undefined): string {
    if (!data) {
      return '';
    }
  
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = String(dataObj.getFullYear());
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    const segundos = String(dataObj.getSeconds()).padStart(2, '0');
  
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}