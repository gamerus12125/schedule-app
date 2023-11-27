const Button = ({
  children,
  type,
  className,
  funcClick,
}: {
  children: string;
  type: "button" | "submit" | "reset";
  funcClick?: Function,
  className?: string
}) => {
  return (
    <button
      type={type}
      onClick={() => funcClick? funcClick(): undefined}
      className={className + " relative inline-flex items-center justify-center p-3 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-purple-600"}
    >
      <span className="">
        {children}
      </span>
    </button>
  );
};

export default Button;
