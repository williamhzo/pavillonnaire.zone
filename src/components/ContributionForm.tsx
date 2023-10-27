'use client';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Textarea } from '@/components/Textarea';
import { FC, FormEvent, PropsWithChildren, useEffect, useState } from 'react';

export type ContributionFormData = {
  title: string;
  author: string;
  coordinates: string;
  year: string;
  editor: string;
  description: string;
  image: string;
  contributor: string;
  email: string;
};

export const ContributionForm: FC = () => {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setSubmitted(true);

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (error) {
      console.error('error', error);
    }
  }

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  }, [submitted]);

  return (
    // TODO: make it a grid
    <form className="pb-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 md:flex-row">
        <Column>
          <Field>
            <Label htmlFor="title">Titre</Label>
            <Input name="title" id="title" placeholder="Ode pavillonnaire" />
          </Field>

          <Field>
            <Label htmlFor="author">Auteur.ices</Label>
            <Input name="author" id="author" placeholder="Frédéric Ramade" />
          </Field>

          <Field>
            <Label htmlFor="coordinates">Adresse ou coordonnées</Label>
            <Input
              name="coordinates"
              id="coordinates"
              placeholder="Fondettes ou 47.404, 0.599"
            />
          </Field>

          <Field>
            <Label htmlFor="year">Année</Label>
            <Input name="year" id="year" placeholder="2007" />
          </Field>

          <Field>
            <Label htmlFor="editor">Éditeur.ices ou producteur.ices</Label>
            <Input name="editor" id="editor" placeholder="Filigranes" />
          </Field>
        </Column>

        <Column>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Description (1500 caractères max)"
            />
          </Field>

          <Field>
            <Label htmlFor="image">Image</Label>
            <Input name="image" id="image" placeholder="Image (lien URL)" />
          </Field>

          <Field>
            <Label htmlFor="contributor">Qui es-tu ?</Label>
            <Input
              name="contributor"
              id="contributor"
              placeholder="Prénom, nom, sobriquet, blaze, etc."
            />
          </Field>

          <Field>
            <Label htmlFor="email">Mail</Label>
            <Input
              name="email"
              id="email"
              placeholder="contribuer@pavillonnaire.zone"
            />
          </Field>
        </Column>
      </div>

      <div className="mt-8 ">
        {submitted ? (
          <p>
            Merci pour ta contribution ! Elle sera très rapidement ajoutée à la
            carte collaborative.
          </p>
        ) : (
          <button
            type="submit"
            className="bg-white text-black px-8 w-full md:w-[calc(50%-1rem)] py-3"
          >
            Contribuer
          </button>
        )}
      </div>
    </form>
  );
};

const Field: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const Column: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-4 w-full">{children}</div>;
};
