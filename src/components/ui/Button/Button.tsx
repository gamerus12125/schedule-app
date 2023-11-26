const Button = ({
  children,
  type,
  funcClick,
}: {
  children: string;
  type: "button" | "submit" | "reset";
  funcClick?: Function
}) => {
  return (
    <button
      type={type}
      onClick={() => funcClick? funcClick(): undefined}
      className="relative inline-flex items-center justify-center p-3 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-purple-600"
    >
      <span className="">
        {children}
      </span>
    </button>
  );
};

export default Button;
