import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const HeroCard = styled.article`
  border: 1px solid #d7c4f5;
  background: linear-gradient(135deg, #fcf9ff 0%, #ffffff 62%);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 18px;
  display: grid;
  gap: 14px;
`;

export const HeroTop = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const ProfileIdentity = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const AvatarBubble = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: #6f4ab2;
  background: rgba(138, 97, 212, 0.16);
  border: 1px solid rgba(138, 97, 212, 0.34);
`;

export const IdentityText = styled.div`
  display: grid;
  gap: 3px;

  h3 {
    margin: 0;
    font-size: 20px;
  }

  strong {
    font-size: 14px;
    color: #6f4ab2;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const MetaTag = styled.span`
  border: 1px solid #ddcef8;
  background: #fff;
  border-radius: ${({ theme }) => theme.radii.pill};
  min-height: 28px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #6f4ab2;
`;

export const HeroAbout = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

export const Grid = styled.section`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.span`
  border: 1px solid #e3d6f7;
  border-radius: ${({ theme }) => theme.radii.pill};
  min-height: 30px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  background: #fcf9ff;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
`;

export const ListItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 12px;
  display: grid;
  gap: 4px;

  strong {
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: #6f4ab2;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ContactList = styled.div`
  display: grid;
  gap: 8px;
`;

export const ContactRow = styled.div`
  border: 1px solid #e5daf8;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 12px;
  display: grid;
  gap: 2px;

  span {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }

  strong {
    font-size: 13px;
  }
`;

export const Rating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #d18a0d;
  font-size: 14px;
  letter-spacing: 0.02em;
`;
