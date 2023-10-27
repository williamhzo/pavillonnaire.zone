import { ComponentProps, FC } from 'react';

export const Label: FC<ComponentProps<'label'>> = ({ children, ...props }) => {
  return (
    <label className="text-sm" {...props}>
      {children}
    </label>
  );
};
