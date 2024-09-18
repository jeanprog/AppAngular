export function formatInitials(name: string): string {
    const namesArray = name.trim().split(' ');

    if (namesArray.length === 1) {
        return namesArray[0][0].toUpperCase();
    } else if (namesArray.length > 1) {
        const firstNameInitial = namesArray[0][0].toUpperCase();
        const lastNameInitial = namesArray[namesArray.length - 1][0].toUpperCase();
        return `${firstNameInitial}${lastNameInitial}`;
    }
    
    return '';
}