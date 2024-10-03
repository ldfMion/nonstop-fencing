export default function toTitleCase(str: string) {
    const words: string[] = str.toLowerCase().split(' ');
    let finalStr = '';
    words.forEach((word) => {
        finalStr += ' ' + word.charAt(0).toUpperCase() + word.slice(1);
    });
    return finalStr.trim();
}
