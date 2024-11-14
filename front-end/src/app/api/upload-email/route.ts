import {sql} from '@vercel/postgres';
import {NextResponse} from 'next/server';
export async function POST(request: Request) {
    const {searchParams} = new URL(request.url);
    const email = searchParams.get('email');
    try {
        if (!email) {
            throw new EmailUploadError('No email provided');
        }
        await sql`INSERT INTO emails (email) VALUES (${email});`;
        return NextResponse.json(`Email uploaded`, {status: 200});
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === '23505') {
            return NextResponse.json('Email already exists', {status: 200});
        }
        throw new EmailUploadError('Error uploading email');
    }
}

class EmailUploadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EmailUploadError';
    }
}
