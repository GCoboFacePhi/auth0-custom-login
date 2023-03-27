import { ReactNode } from 'react';
import { StyledLayout, StyledModalLayout } from './Styles';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <StyledLayout
      forwardedAs="main"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <StyledModalLayout
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        forwardedAs="section"
      >
        {children}
      </StyledModalLayout>
    </StyledLayout>
  );
};
