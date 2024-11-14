import {Button} from './ui/button';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from './ui/dialog';
import {Input} from './ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from './ui/form';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Alert, AlertTitle} from './ui/alert';
import {AlertCircle} from 'lucide-react';
import {ReportIssueButton} from './report-issue-button';

const FormSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email.',
    }),
});

export function EmailUpdates() {
    const [uploaded, setUploaded] = useState(false);
    const [error, setError] = useState(false);
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        try {
            const response = await fetch('/api/upload-email?email=' + data.email, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            setUploaded(true);
            setError(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
        },
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="py-2 text-sm">
                    Get Updates
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-lg !rounded-custom">
                <DialogHeader>
                    <DialogTitle className="text-left">Receive Updates</DialogTitle>
                    <DialogDescription className="text-left">{"We'll"} let you know when we upload results from a meet.</DialogDescription>
                </DialogHeader>
                {error && (
                    <Alert variant="destructive" className="!rounded-custom p-3">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="text-sm">There was an error saving your email.</AlertTitle>
                        {/* <AlertDescription>There was an error saving you email.</AlertDescription> */}
                        <ReportIssueButton />
                    </Alert>
                )}
                {uploaded ? (
                    <p>Thanks!</p>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} className="!rounded-custom" />
                                        </FormControl>
                                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" className="self-end">
                                    Submit
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
