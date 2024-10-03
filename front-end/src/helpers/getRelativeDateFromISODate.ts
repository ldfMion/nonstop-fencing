export default function getRelativeDateFromISODate(date: string): string {
    const dateObj = new Date(date);
    const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: undefined,
    }).format(dateObj);
    return formatted;
}
