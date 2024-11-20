import {z} from 'zod';
import {Fencer} from '~/models/Fencer';

const A = 'A';
const B = 'B';

const MEN_STRING = "Men's";
const WOMEN_STRING = "Women's";

export const getFormSchema = () =>
    z.object({
        eventName: z.string(),
        gender: z.union([z.literal(MEN_STRING), z.literal(WOMEN_STRING)]),
        teamAName: z.string(),
        teamBName: z.string(),
        bouts: z.array(
            z
                .object({
                    fencerAName: z.string().min(1).optional(),
                    // .refine((fencerName) => {
                    //     return fencerName == undefined || fencersA.find((fencer) => fencer.name == fencerName) != undefined;
                    // }),
                    fencerBName: z.string().min(1).optional(),
                    // .refine((fencerName) => {
                    //     return fencerName == undefined || fencersB.find((fencer) => fencer.name == fencerName) != undefined;
                    // }),
                    scoreA: z.coerce.number().min(0).max(5).int().optional(),
                    scoreB: z.coerce.number().min(0).max(5).int().optional(),
                    winnerIndicator: z.union([z.literal(A), z.literal(B)]).optional(),
                })
                .refine(
                    (data) => {
                        console.log('refining');
                        console.log(data);
                        if (data.fencerAName != undefined && data.fencerBName != undefined) {
                            if (data.scoreA == undefined && data.scoreB == undefined && data.winnerIndicator == undefined) {
                                console.log('Did not pass');
                                return false;
                            }
                        }
                        console.log('passed');
                        return true;
                    },
                    {
                        message: 'If both fencers are present, either score or winner indicator must be present.',
                        path: ['winnerIndicator'],
                    },
                )
                .refine(
                    (data) => {
                        if (data.scoreA != undefined && data.scoreB != undefined && data.scoreA == data.scoreB && data.winnerIndicator == undefined) {
                            return false;
                        }
                        return true;
                    },
                    {message: 'In case of a tie, the winner indicator must be present.', path: ['winnerIndicator']},
                )
                .refine(
                    (data) => {
                        if ((data.scoreA != undefined && data.scoreB == undefined) || (data.scoreB != undefined && data.scoreA == undefined)) {
                            return false;
                        }
                        return true;
                    },
                    {message: 'The two scores must be present.', path: ['scoreA', 'scoreB']},
                ),
        ),
    });
