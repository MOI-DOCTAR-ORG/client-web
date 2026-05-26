import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="flex items-center gap-2.5" to="/" aria-label="MOI DOCTOR home">
      <img
        src="/Logo.png"
        alt="MOI DOCTOR"
        className="h-10 w-auto"
      />
    </Link>
  );
}
