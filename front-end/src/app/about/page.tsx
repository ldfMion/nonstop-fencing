import {Button} from '~/components/ui/button';
import {Card} from '~/components/ui/card';

export default function About() {
    return (
        <div className="flex flex-col p-8 sm:p-10">
            <div className="flex h-[70vh] flex-col gap-8 px-0 py-16 sm:px-6">
                <h2 className="text-3xl font-bold">About Us</h2>
                <h3 className="max-w-2xl text-5xl font-semibold text-primary sm:text-7xl">A centralized platform for NCAA Fencing results</h3>
            </div>
            <Card className="flex animate-appear flex-col gap-8 !rounded-[40px] bg-black p-8 text-white sm:p-14">
                <P>As fencers, we know the frustration of looking through PDF files, managing our own records, and missing out on seeing how our peers and competitors are performing.</P>
                <P>
                    That's why we created a platform where collegiate fencers can effortlessly access their data. Whether it's your own match results or the outcomes from other fencers and teams,
                    everything is right here.
                </P>
                <P>
                    Right now, our data covers records and team results from the 23-24 season, but we're just getting started. Our goal is to also include individual bout results, giving fencers a
                    detailed history of every match they've fenced for following seasons.
                </P>
                <P>If you believe you can help with data, development, or something else, hit us up!</P>
                <Button variant="default" size="lg" className="animate-pulse self-end font-semibold">
                    <a href="mailto:difrancescomion.1@osu.edu">Contact Us</a>
                </Button>
            </Card>
        </div>
    );
}

function P({children}: {children: string}) {
    return <p className="text-xl font-semibold">{children}</p>;
}
