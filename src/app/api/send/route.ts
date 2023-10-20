import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log('request', request.body);
  try {
    const data = await resend.emails.send({
      from: 'Contribution Pav Zone <contribuer@pavillonnaire.zone>',
      to: ['contribuer@pavillonnaire.zone'],
      subject: 'Nouvelle contrib!',
      react: EmailTemplate(request.body),
      text: 'Hello world',
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
