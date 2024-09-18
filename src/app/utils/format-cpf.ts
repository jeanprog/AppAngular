export function formatCPF(cpf: string | undefined): string {
    if (!cpf) {
        return '';
    }

    const cpfNumbers = cpf.replace(/\D/g, '');
    const bloco1 = cpfNumbers.slice(0, 3);
    const bloco2 = cpfNumbers.slice(3, 6);
    const bloco3 = cpfNumbers.slice(6, 9);
    const digitoVerificador = cpfNumbers.slice(9, 11);
    return `${bloco1}.${bloco2}.${bloco3}-${digitoVerificador}`;
}