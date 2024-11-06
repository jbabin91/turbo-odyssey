import Container, { type ContainerProps } from '@mui/material/Container';

export type PageContainerProps = {
  children: React.ReactNode;
} & ContainerProps;

export function PageContainer({ children, ...props }: PageContainerProps) {
  return (
    <Container {...props}>
      <main>{children}</main>
    </Container>
  );
}
