import { BarProps } from "recharts";

interface CustomBarProps extends Omit<BarProps, "fill"> {
  fill?: string;
  index?: number;
}

export const CustomBar = (props: CustomBarProps) => {
  const { fill, x, y, width, height, index } = props;
  const animationDelay = index ? `${index * 0.2}s` : '0s';

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        style={{
          filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))",
          animation: `float 3s ease-in-out infinite, rainbow var(--speed, 2s) infinite linear`,
          animationDelay,
          transform: "perspective(1000px) rotateX(10deg)",
          transformOrigin: "bottom",
          transition: "transform 0.3s ease",
        }}
        rx={4}
        ry={4}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.transform = "perspective(1000px) rotateX(20deg) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.transform = "perspective(1000px) rotateX(10deg)";
        }}
      />
      {/* Reflexo 3D */}
      <rect
        x={x}
        y={Number(y) + Number(height)}
        width={width}
        height={height * 0.2}
        fill={fill}
        style={{
          opacity: 0.2,
          transform: "scaleY(-1) skewX(45deg)",
          transformOrigin: "top",
          filter: "blur(2px)",
        }}
        rx={4}
        ry={4}
      />
    </g>
  );
};