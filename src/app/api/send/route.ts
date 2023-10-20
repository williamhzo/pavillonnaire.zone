import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log('request', request.json);
  try {
    const data = await resend.emails.send({
      from: 'Contribution Pav Zone <contribuer@pavillonnaire.zone>',
      to: ['hi@williamhzo.me'],
      subject: 'Nouvelle contrib!',
      react: EmailTemplate({ firstName: 'prout' }),
      text: 'Hello world',
    });

    return NextResponse.json(data);
    return null;
  } catch (error) {
    return NextResponse.json({ error });
  }
}
