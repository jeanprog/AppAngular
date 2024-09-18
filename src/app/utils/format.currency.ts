/**
 *
 * @param {number} value Valor a ser formatado
 * @param {Intl.LocalesArgument} locales Localidade
 * @param {Intl.NumberFormatOptions} options Opções de formatação
 * @returns {string} Retorna o valor formatado como moeda
 */
export function formatCurrency(value: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string {
    if (!locales) {
      locales = 'pt-BR';
    }
  
    if (!options) {
      options = {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    }
  
    const formattedValue = value.toLocaleString(locales, options);
  
    return formattedValue;
  }
  

  export function formatCurrencyV2(value: string): string {
    // Remove o 'R$' e quaisquer espaços em branco, em seguida, converte para número
    const numericValue = parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    
    if (isNaN(numericValue)) {
        return `"0,00"`; // Retorna "0,00" se a conversão falhar
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(numericValue).replace('R$', '');
    
    return `"${formattedValue}"`; // Adiciona aspas duplas
}