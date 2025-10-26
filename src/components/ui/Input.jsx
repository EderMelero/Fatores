export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 ${props.className || ""}`}
    />
  );
}
