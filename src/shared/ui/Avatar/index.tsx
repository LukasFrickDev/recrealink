import * as S from "./styles";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = ({ name, imageUrl, size = "md" }: AvatarProps) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((chunk) => chunk.charAt(0).toUpperCase())
    .join("");

  return (
    <S.AvatarBase $size={size}>
      {imageUrl ? <img src={imageUrl} alt={name} /> : <span>{initials}</span>}
    </S.AvatarBase>
  );
};
