import dayjs from 'dayjs';

export function formatDateIso(data: Date) {
  if (!data) {
    return '';
  }
  const isoFormat = dayjs(data).toISOString();
  return isoFormat;
}

export function formatDate(data: string | Date | undefined): string {
  // Verifique o valor aqui
  if (!data) {
    return '';
  }

  const dataObj = typeof data === 'string' ? new Date(data) : data;
  const formattedDate = dayjs(dataObj).format('DD/MM/YYYY');

  return formattedDate;
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
