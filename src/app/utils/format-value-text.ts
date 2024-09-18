export function formatValueText(value: number | undefined, singularLabel: string, pluralLabel: string, zeroLabel: string = '-'): string {
    if (value === undefined || value === null) {
        return '';
    }

    if (value === 0) {
        return zeroLabel;
    }

    const label = value > 1 ? pluralLabel : singularLabel;
    return `${value} ${label}`;
}
