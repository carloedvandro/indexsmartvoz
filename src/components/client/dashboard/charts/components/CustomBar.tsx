import { BarProps } from "recharts";

interface CustomBarProps extends Omit<BarProps, "fill"> {
  fill?: string;
  index?: number;
}

export const CustomBar = (props: CustomBarProps) => {
  const { fill, x, y, width, height, index } = props;
  const animationDelay = index ? `${index * 0.2}s` : '0s';

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      style={{
        filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))",
        animation: `float 3s ease-in-out infinite`,
        animationDelay,
        transform: "rotate(360deg)",
        transformOrigin: "center",
      }}
      rx={4}
      ry={4}
    >
      <animate
        attributeName="opacity"
        values="0.7;1;0.7"
        dur="3s"
        repeatCount="indefinite"
      />
    </rect>
  );
};