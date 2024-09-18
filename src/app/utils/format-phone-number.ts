export function formatPhoneNumber(phoneNumber: string | undefined): string {
    if (!phoneNumber) {
        return '';
    }

    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const areaCode = cleanedNumber.slice(0, 2);
    const firstPart = cleanedNumber.slice(2, 7);
    const secondPart = cleanedNumber.slice(7, 11);

    return `(${areaCode}) ${firstPart}-${secondPart}`;
}
