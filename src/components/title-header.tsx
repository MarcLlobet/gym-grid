import styled from "@emotion/styled";

const TitleHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-bottom: 24px;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.25px;
  padding: 0;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.25px;
  margin-bottom: 8px;
  margin: 0;
  padding: 0;
`;
type Props = {
  title: string;
  description?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function TitleHeader({ title, description }: Props): React.ReactNode {
  return (
    <TitleHeaderWrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </TitleHeaderWrapper>
  );
}
