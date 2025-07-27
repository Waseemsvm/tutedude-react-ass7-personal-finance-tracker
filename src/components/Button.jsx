export default function Button({ text, onClick, className }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={(e) => {
        onClick?.();
      }}
    >
      {text}
    </button>
  );
}
