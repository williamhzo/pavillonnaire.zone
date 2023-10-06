import { ComponentProps, FC } from 'react';

export const Label: FC<ComponentProps<'label'>> = ({ children, ...props }) => {
  return (
    <label className="" {...props}>
      {children}
    </label>
  );
};
