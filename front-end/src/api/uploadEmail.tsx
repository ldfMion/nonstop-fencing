'use server';
import {sql} from '@vercel/postgres';

export async function uploadEmail(email: string): Promise<void> {
    console.log('uploading email');
    try {
        await sql`INSERT INTO emails (email) VALUES (${email});`;
    } catch (error) {
        console.log(error);
        if (error instanceof Error && 'code' in error && error.code === '23505') {
            return;
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
