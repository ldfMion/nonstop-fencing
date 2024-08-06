export default function BackgroundGlow({color}: {color: string}) {
    return (
        <div
            className={`absolute left-0 top-0 aspect-square h-screen bg-gradient-to-r from-[color:${color}]`}
        ></div>
    );
}

// bg-[${color}]
