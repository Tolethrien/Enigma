export const COLORS = {
  red: { bg: "bg-red-700", shadow: "shadow-innerColorRed" },
  orange: { bg: "bg-orange-700", shadow: "shadow-innerColorOrange" },
  yellow: { bg: "bg-yellow-700", shadow: "shadow-innerColorYellow" },
  green: { bg: "bg-emerald-700", shadow: "shadow-innerColorGreen" },
  cyan: { bg: "bg-cyan-700", shadow: "shadow-innerColorCyan" },
  purple: { bg: "bg-purple-800", shadow: "shadow-innerColorPurple" },
  pink: { bg: "bg-pink-700", shadow: "shadow-innerColorPink" },
};
export const avalibleIconColors = Object.keys(
  COLORS,
) as (keyof typeof COLORS)[];
export type AvalibleIconColorsT = keyof typeof COLORS;
interface Props {
  color: keyof typeof COLORS;
  onClick: () => void;
  isSelected: boolean;
}
export default function ColorIcon({ color, onClick, isSelected }: Props) {
  return (
    <div
      className={`h-6 w-6 rounded-full ${COLORS[color].bg} ${COLORS[color].shadow} shadow-innerColor cursor-pointer border-[1px] border-gray-500 border-opacity-50 ${isSelected && "scale-125"}`}
      onClick={onClick}
    ></div>
  );
}
