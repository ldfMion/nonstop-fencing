/* function Record1({record}: {record: {wins: number; losses: number}}) {
    return (
        <div className="flex flex-row gap-1">
            <RecordNumber number={record.wins} className="bg-green-400" />
            <RecordNumber number={record.losses} className="bg-red-400" />
        </div>
    );
} */

/* function RecordNumber({number, className}: {number: number; className?: string}) {
    return (
        <div
            className={
                'flex h-[28px] w-[28px] items-center justify-center rounded-md font-semibold leading-none text-white ' +
                className
            }
        >
            {number}
        </div>
    );
} */

const showPercentage = false;
function Record2({record}: {record: {wins: number; losses: number}}) {
    const percentage = (Math.round((record.wins / (record.wins + record.losses)) * 100) / 100).toFixed(2).toString().replace(/^0\./, '.');
    return (
        <div className="flex flex-row gap-2">
            {showPercentage && <p className="w-[36px] text-right">({percentage})</p>}
            <p className="w-[22px] text-right font-bold text-green-400">{record.wins}</p>
            <p className="w-[22px] text-right font-bold text-red-500">{record.losses}</p>
        </div>
    );
}

// function Record3({record}: {record: {wins: number; losses: number}}) {
//     return (
//         <div className="flex flex-row gap-2">
//             <p className="text-right font-bold">
//                 {record.wins} - {record.losses}
//             </p>
//         </div>
//     );
// }

export default Record2;
