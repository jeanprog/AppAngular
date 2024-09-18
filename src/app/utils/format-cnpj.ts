export function formatCNPJ(cnpj: string | undefined): string {
    if (!cnpj) {
        return '';
    }

    // Remove todos os caracteres não numéricos
    const cleanedCNPJ = cnpj.replace(/\D/g, '');

    // Adiciona a máscara de CNPJ
    const part1 = cleanedCNPJ.slice(0, 2);
    const part2 = cleanedCNPJ.slice(2, 5);
    const part3 = cleanedCNPJ.slice(5, 8);
    const part4 = cleanedCNPJ.slice(8, 12);
    const part5 = cleanedCNPJ.slice(12, 14);

    return `${part1}.${part2}.${part3}/${part4}-${part5}`;
}