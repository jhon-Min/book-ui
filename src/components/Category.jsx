export default function Category({ name }) {
  return (
    <button
      className={`border text-white border-red-500 rounded-2xl me-4 mb-3 py-1 px-3 text-sm md:text-md whitespace-nowrap md:mt-0 hover:bg-red-500`}
    >
      {name}
    </button>
  );
}
