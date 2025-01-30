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
        filter: "drop-shadow(0px 2px 8px rgba(95, 8, 137, 0.3))",
        animation: `moveGradient 3s ease-in-out infinite`,
        animationDelay,
        transformOrigin: "bottom",
      }}
      rx={4}
      ry={4}
    >
      <animate
        attributeName="height"
        values={`${height};${height * 1.02};${height}`}
        dur="3s"
        repeatCount="indefinite"
      />
    </rect>
  );
};