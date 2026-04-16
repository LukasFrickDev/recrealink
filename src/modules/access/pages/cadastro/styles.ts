import styled from "styled-components";

export const Page = styled.main<{
  $backgroundGradient: string;
  $backgroundOverlay: string;
  $backgroundImage: string;
  $backgroundImagePosition: string;
}>`
  min-height: 100vh;
  padding: 26px 16px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  background: ${({ $backgroundGradient }) => $backgroundGradient};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${({ $backgroundImage }) => $backgroundImage});
    background-size: cover;
    background-position: ${({ $backgroundImagePosition }) => $backgroundImagePosition};
    opacity: 0.12;
    transform: scale(1.04);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $backgroundOverlay }) => $backgroundOverlay};
  }
`;

export const Glow = styled.div`
  position: absolute;
  z-index: 1;
  width: 340px;
  height: 340px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.11);
  filter: blur(58px);
  pointer-events: none;

  &[data-side="right"] {
    top: -150px;
    right: -150px;
  }

  &[data-side="left"] {
    bottom: -150px;
    left: -150px;
  }
`;

export const Container = styled.section`
  width: min(590px, 100%);
  position: relative;
  z-index: 2;
`;

export const Brand = styled.header`
  display: grid;
  justify-items: center;
  text-align: center;
  margin-bottom: 14px;

  img {
    width: clamp(126px, 28vw, 184px);
    height: auto;
    object-fit: contain;
    margin-bottom: 8px;
  }

  span {
    margin-top: 2px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 14px;
    max-width: 520px;
    line-height: 1.45;
  }
`;

export const Card = styled.section`
  border-radius: 24px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 251, 255, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.42);
  box-shadow: 0 24px 52px rgba(16, 29, 54, 0.28);
  backdrop-filter: blur(10px);
  padding: 22px;
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
`;

export const CardHeader = styled.header`
  margin-bottom: 14px;
  text-align: center;

  h2 {
    font-size: clamp(24px, 4vw, 30px);
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 12px;
`;

export const BackAction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -2px;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const NativeSelect = styled.select`
  width: 100%;
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 4px rgba(46, 127, 240, 0.15);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 4px rgba(46, 127, 240, 0.15);
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SubmitButton = styled.button<{ $actionColor: string }>`
  width: 100%;
  min-height: 48px;
  border: 1px solid ${({ $actionColor }) => $actionColor};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $actionColor }) => $actionColor};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const FooterLinks = styled.p`
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.brandBlue};
    font-weight: 700;
  }
`;

export const Helper = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;
