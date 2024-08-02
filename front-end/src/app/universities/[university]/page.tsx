import getUniversity from '~/api/getUniversity';

export default async function TeamAndWeaponPage({params}: {params: {university: string}}) {
    const university = await getUniversity(params.university);
    return (
        <main className="flex flex-col items-center p-6">
            {university ? university.displayNameLong : 'University not found'}
        </main>
    );
}

function toTitleCase(str: string) {
    const words: string[] = str.toLowerCase().split(' ');
    let finalStr = '';
    words.forEach((word) => {
        finalStr += ' ' + word.charAt(0).toUpperCase() + word.slice(1);
    });
    return finalStr;
}
