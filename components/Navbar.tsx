import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <div className="w-full h-16 px-6 flex items-center justify-between border-b shadow-sm bg-white">
      <h1 className="text-lg font-semibold">Fasdeem AI</h1>
      <AuthButton />
    </div>
  );
}
