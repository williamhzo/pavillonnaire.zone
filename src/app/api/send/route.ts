import { EmailTemplate } from '@/components/EmailTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const send = await resend.emails.send({
      from: 'Contribution Pav Zone <contribuer@pavillonnaire.zone>',
      to: ['contribuer@pavillonnaire.zone'],
      subject: 'Nouvelle contrib!',
      react: EmailTemplate(data),
      text: 'Hello world',
    });

    return NextResponse.json({ message: 'all G', send, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'saucisse', error });
  }
}
