export default function Container({
  children,
  allign,
  className,
  center,
}: Readonly<{
  children: React.ReactNode;
  allign?: "center" | "right" | "left";
  className?: string;
  center?: boolean;
}>) {
  const handleAllignment = () => {
    const options = {
      center: "justify-center",
      right: "justify-end",
      left: "justify-start",
    };
    return allign ? options[allign] : options.center;
  };
  return (
    <div
      className={`${handleAllignment()} ${
        center && "absolute top-[50%] left-[50%] translate-[-50%]"
      } m-auto flex max-w-7xl w-full px-4 py-2 ${className}`}
    >
      {children}
    </div>
  );
}
