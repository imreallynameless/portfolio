import styled from "styled-components";

export const breakpoints = {
  mobile: "768px",
} as const;

export const colors = {
  primary: "#fc4c02",
  text: "#333",
  textLight: "#666",
  background: "#f5f5f5",
  white: "#ffffff",
} as const;

export const fonts = {
  primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  serif: '"Merriweather", serif',
} as const;

export const PageLayout = styled.main`
  display: grid;
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 50px 20px;
  gap: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
  }
`;

export const GridLayout = styled(PageLayout)`
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px 1fr;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px 1fr 1fr;
  }
`;

export const FlexLayout = styled(PageLayout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 500px;
    gap: 30px;
  }
`;

export const PageHeading = styled.h1`
  font-family: ${fonts.primary};
  font-size: 5rem;
  letter-spacing: 0.4rem;
  margin: 0;
  font-display: swap;
  line-height: 1.2;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const SectionHeading = styled.h2`
  font-family: ${fonts.primary};
  font-size: 2.5rem;
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const SubHeading = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.5rem;
  color: ${colors.text};
  margin: 0 0 15px 0;
`;

export const HeadingContainer = styled.div`
  grid-column: span 3;
  text-align: center;
  padding: 40px 0;

  @media (max-width: ${breakpoints.mobile}) {
    grid-column: span 2;
    padding: 20px 0;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background: ${colors.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const BodyText = styled.p`
  font-size: 1.8rem;
  line-height: 2.8rem;
  color: ${colors.text};
  margin: 0;
`;

export const SmallText = styled.p`
  font-family: ${fonts.primary};
  font-size: 0.9rem;
  color: ${colors.textLight};
  margin: 0;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  font-family: ${fonts.primary};
  border: none;
  background-color: ${colors.primary};
  color: ${colors.white};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e03d00;
  }

  &:disabled {
    background-color: ${colors.textLight};
    cursor: not-allowed;
  }
`;

export const SkeletonLoader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SkeletonCard = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  height: 80px;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  font-family: ${fonts.primary};
  color: ${colors.textLight};
  font-style: italic;
  padding: 20px;
`;

