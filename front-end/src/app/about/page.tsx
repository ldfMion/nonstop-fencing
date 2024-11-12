import {Button} from '~/components/ui/button';

export default function About() {
    return (
        <div className="flex flex-col p-8 sm:p-10">
            <div className="flex h-[70vh] flex-col gap-8 px-0 py-16 sm:px-6">
                <h2 className="text-3xl font-bold">About Us</h2>
                <h3 className="max-w-2xl text-5xl font-semibold text-primary sm:text-7xl">A centralized platform for NCAA Fencing results</h3>
            </div>
            <div className="flex animate-appear flex-col gap-4 px-4 sm:px-16">
                <h2 className="text-4xl font-bold">A new way to experience collegiate fencing</h2>
                <P>
                    As fencers, we know the frustration of managing our own records, missing out on seeing how our peers and competitors are
                    performing, or event going through PDFs to find your previous bouts.
                </P>
                <P>
                    That&apos;s why we created a platform where collegiate fencers can effortlessly access their results. Whether it&apos;s your own
                    match results or the outcomes from other fencers and teams, everything is right here.
                </P>
                <P>If you believe you can help with data, development, or something else, hit us up!</P>
                <Button variant="default" size="lg" className="animate-pulse self-end font-semibold">
                    <a href="mailto:difrancescomion.1@osu.edu">Contact Us</a>
                </Button>
            </div>
        </div>
    );
}

function P({children}: {children: string}) {
    return <p className="text-3xl font-semibold">{children}</p>;
}
