export default function Button({ type, text, onClick, className }) {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={(e) => {
        onClick?.();
      }}
    >
      {text}
    </button>
  );
}
