import getRelativeDateFromISODate from '~/helpers/getRelativeDateFromISODate';

export default function Date({isoDate}: {isoDate: string}): JSX.Element {
    return <p className="mt-2 text-nowrap font-semibold text-gray-500">{getRelativeDateFromISODate(isoDate)}</p>;
}
