import {Button} from '~/components/ui/button';
import {Card} from '~/components/ui/card';

export default function About() {
    return (
        <div className="flex flex-col p-10">
            <div className="flex h-[70vh] flex-col gap-8 px-6 py-16">
                <h2 className="text-3xl font-bold">About Us</h2>
                <h3 className="max-w-2xl text-7xl font-semibold text-primary">
                    A centralized platform for NCAA Fencing results
                </h3>
            </div>
            <Card className="animate-appear flex flex-col items-end gap-8 rounded-3xl bg-black p-16 text-white">
                <P>
                    As fencers, we know the frustration of sifting through PDF files, managing our
                    own records, and missing out on seeing how our peers and competitors are
                    performing. Tracking results across different teams and events shouldn't be this
                    challenging.
                </P>
                <P>
                    That's why we created this platform—a centralized hub where collegiate fencers
                    can effortlessly access and analyze their performance data. Whether it's your
                    own match results or the outcomes from other fencers and teams, everything is
                    right here at your fingertips.
                </P>
                <P>
                    Right now, our data covers the essentials, but we're just getting started. Our
                    goal is to expand this resource to include individual bout results, giving you a
                    detailed history of every match you’ve fenced. With this platform, you can track
                    your progress, learn from every bout, and stay ahead of the competition.
                </P>
                <P>
                    If you believe you think you can help with data, development, or something else,
                    hit us up!
                </P>
                <Button variant="default" size="lg">
                    <a href="mailto:difrancescomion.1@osu.edu">Contact Us</a>
                </Button>
            </Card>
        </div>
    );
}

function P({children}: {children: string}) {
    return <p className="text-xl font-semibold">{children}</p>;
}
