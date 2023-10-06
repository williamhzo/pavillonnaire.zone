import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { FC, PropsWithChildren } from 'react';

export const ContributionForm: FC = () => {
  return (
    <form className="flex flex-col gap-8">
      <p>form</p>

      <Field>
        <Label htmlFor="test">hey</Label>
        <Input name="test" id="test" placeholder="Ode pavillonnaire" />
      </Field>

      <Input />
      <Input />
      <Input />
    </form>
  );
};

const Field: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};
