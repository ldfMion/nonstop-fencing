'use client';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '~/components/ui/select';
import {University2} from '~/models/University2';
import {Event} from '~/models/Event';
import {Gender} from '~/models/Gender';
import {Input} from '~/components/ui/input';
import {Fencer} from '~/models/Fencer';
import {useMemo, useState} from 'react';
import {Weapon} from '~/models/Weapon';
import assert from 'assert';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '~/components/ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Control, useForm, UseFormReturn} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '~/components/ui/button';
import {getFormSchema} from './getFormSchema';

const BOUT_ORDER = {
    left: [3, 1, 2, 1, 3, 2, 1, 2, 3],
    right: [6, 5, 4, 5, 4, 5, 4, 6, 5],
};

const MEN_STRING = "Men's";
const WOMEN_STRING = "Women's";
const A = 'A';
const B = 'B';
const formSchema = getFormSchema();

export function MatchEntryForm({allFencers, allUniversities, allEvents}: {allFencers: Fencer[]; allUniversities: University2[]; allEvents: Event[]}) {
    const matchForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });
    const universityAName = matchForm.watch('teamAName');
    const universityBName = matchForm.watch('teamBName');
    console.log(matchForm.watch('bouts'));
    const universityA = allUniversities.find((university) => university.displayNameShort === universityAName);
    const universityB = allUniversities.find((university) => university.displayNameShort === universityBName);
    const genderString = matchForm.watch('gender');
    // const eventName = matchForm.watch('eventName');
    const gender = genderString == MEN_STRING ? Gender.MEN : Gender.WOMEN;
    // console.log(`University A: ${universityA?.displayNameShort}`, `University B: ${universityB?.displayNameShort}`);
    // console.log(`Gender: ${genderString}, ${gender}`);
    const fencersOfGender = useMemo(() => allFencers.filter((fencer) => fencer.gender === gender), [gender]);

    const universityAFencers = useMemo(
        () => (universityA ? fencersOfGender.filter((fencer) => fencer.universityId == universityA.id) : undefined),
        [universityA, fencersOfGender],
    );

    const universityBFencers = useMemo(
        () => (universityB ? fencersOfGender.filter((fencer) => fencer.universityId == universityB.id) : undefined),
        [universityB, fencersOfGender],
    );

    const universityAFoil = useMemo(() => (universityAFencers ? filterByWeapon(universityAFencers, Weapon.FOIL) : undefined), [universityAFencers]);
    const universityAEpee = useMemo(() => (universityAFencers ? filterByWeapon(universityAFencers, Weapon.EPEE) : undefined), [universityAFencers]);
    const universityASaber = useMemo(() => (universityAFencers ? filterByWeapon(universityAFencers, Weapon.SABER) : undefined), [universityAFencers]);
    // console.log( 'University A Foil: ', universityAFoil?.map((fencer) => fencer.name),);

    const universityBFoil = useMemo(() => (universityBFencers ? filterByWeapon(universityBFencers, Weapon.FOIL) : undefined), [universityBFencers]);
    const universityBEpee = useMemo(() => (universityBFencers ? filterByWeapon(universityBFencers, Weapon.EPEE) : undefined), [universityBFencers]);
    const universityBSaber = useMemo(() => (universityBFencers ? filterByWeapon(universityBFencers, Weapon.SABER) : undefined), [universityBFencers]);
    // console.log( 'University B Foil: ', universityBFoil?.map((fencer) => fencer.name),);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('submitting');
        console.log(data);
    };

    return (
        <>
            <Form {...matchForm}>
                <form onSubmit={matchForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={matchForm.control}
                        name="eventName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Event</FormLabel>
                                <FormControl>
                                    <Dropdown
                                        items={allEvents.map((e) => e.displayName)}
                                        label="Event"
                                        placeholder="Select an event"
                                        setValue={field.onChange}
                                        tabIndex={1}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={matchForm.control}
                        name="gender"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Dropdown
                                        items={[MEN_STRING, WOMEN_STRING]}
                                        label="Gender"
                                        placeholder="Select a gender"
                                        setValue={field.onChange}
                                        tabIndex={2}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-between">
                        <FormField
                            control={matchForm.control}
                            name="teamAName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Team A</FormLabel>
                                    <FormControl>
                                        <Dropdown
                                            items={allUniversities.map((u) => u.displayNameShort)}
                                            label="Team A"
                                            placeholder="Select a team"
                                            setValue={field.onChange}
                                            tabIndex={3}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={matchForm.control}
                            name="teamBName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Team B</FormLabel>
                                    <FormControl>
                                        <Dropdown
                                            items={allUniversities.map((u) => u.displayNameShort)}
                                            label="Team B"
                                            placeholder="Select a team"
                                            setValue={field.onChange}
                                            tabIndex={4}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {universityAFoil && universityAEpee && universityASaber && universityBFoil && universityBEpee && universityBSaber && (
                        <div className="flex flex-col items-center gap-8">
                            <WeaponSection
                                weapon={Weapon.FOIL}
                                fencersA={universityAFoil}
                                fencersB={universityBFoil}
                                startingTabIndex={5}
                                form={matchForm}
                            />
                            <WeaponSection
                                weapon={Weapon.EPEE}
                                fencersA={universityAEpee}
                                fencersB={universityBEpee}
                                startingTabIndex={41}
                                form={matchForm}
                            />
                            <WeaponSection
                                weapon={Weapon.SABER}
                                fencersA={universityASaber}
                                fencersB={universityBSaber}
                                startingTabIndex={77}
                                form={matchForm}
                            />
                        </div>
                    )}
                    <Button type="submit" className="mt-10">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
}

function filterByWeapon(fencers: Fencer[], weapon: Weapon) {
    return fencers.filter((fencer) => fencer.weapon === weapon);
}

type BoutInput = {
    fencerAName?: string;
    fencerBId?: string;
    score?: {
        a: number;
        b: number;
    };
    winnerId?: string;
    order: number;
    ncaaStatus: boolean;
};

function WeaponSection({
    fencersA,
    fencersB,
    weapon,
    startingTabIndex,
    form,
}: {
    fencersA: Fencer[];
    fencersB: Fencer[];
    weapon: Weapon;
    startingTabIndex: number;
    form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
    const title = weapon == Weapon.FOIL ? 'Foil' : weapon == Weapon.SABER ? 'Saber' : 'Epee';
    const startingIndex = weapon == Weapon.FOIL ? 0 : weapon == Weapon.EPEE ? 9 : 18;
    const fencersAListId = `fencers-a-${title}`;
    const fencersBListId = `fencers-b-${title}`;

    return (
        <>
            <h3 className="self-start text-xl font-bold">{title}</h3>
            <div className="flex flex-col gap-4">
                {new Array(9).fill(0).map((_, i) => (
                    <BoutInput
                        placeholderA={'Fencer name'}
                        placeholderB="Fencer name"
                        listIdA={fencersAListId}
                        listIdB={fencersBListId}
                        tabindex={startingTabIndex}
                        boutIndex={startingIndex + i}
                        form={form}
                    />
                ))}
            </div>
            <datalist id={fencersAListId}>
                {fencersA.map((fencer) => (
                    <option key={fencer.id} value={fencer.name}></option>
                ))}
            </datalist>
            <datalist id={fencersBListId}>
                {fencersB.map((fencer) => (
                    <option value={fencer.name} key={fencer.id}></option>
                ))}
            </datalist>
        </>
    );
}

function BoutInput({
    placeholderA,
    placeholderB,
    listIdA,
    listIdB,
    tabindex,
    form,
    boutIndex,
}: {
    placeholderA: string;
    placeholderB: string;
    listIdA: string;
    listIdB: string;
    tabindex: number;
    form: UseFormReturn<z.infer<typeof formSchema>>;
    boutIndex: number;
}) {
    return (
        <div className="flex flex-row justify-stretch gap-4">
            <FormField
                control={form.control}
                name={`bouts.${boutIndex}.fencerAName`}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder={placeholderA} {...field} className="" list={listIdA} tabIndex={tabindex} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`bouts.${boutIndex}.scoreA`}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} type="number" className="w-16" tabIndex={tabindex + 27} />
                        </FormControl>
                        <FormMessage className="w-16 text-nowrap" />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`bouts.${boutIndex}.scoreB`}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} type="number" className="w-16" tabIndex={tabindex + 36} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`bouts.${boutIndex}.fencerBName`}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder={placeholderB} className="" {...field} list={listIdB} tabIndex={tabindex + 18} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`bouts.${boutIndex}.winnerIndicator`}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Dropdown items={['A', 'B']} label="Winner" placeholder="" setValue={field.onChange} value={field.value ?? ''} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    );
}

function Dropdown({
    items,
    label,
    placeholder,
    setValue,
    tabIndex,
    value,
}: {
    items: string[];
    label: string;
    placeholder: string;
    setValue: (value: string) => void;
    tabIndex?: number;
    value: string;
}) {
    return (
        <Select onValueChange={setValue} value={value}>
            <SelectTrigger className="w-[180px]" tabIndex={tabIndex}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {items.map((item) => (
                        <SelectItem key={item} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
