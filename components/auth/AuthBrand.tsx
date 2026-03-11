import Link from "next/link";

type AuthBrandProps = {
  mobileOnly?: boolean;
};

export default function AuthBrand({ mobileOnly }: AuthBrandProps) {
  return (
    <Link
      href="/"
      className={[
        "w-fit text-lg font-semibold tracking-tight",
        mobileOnly ? "lg:hidden" : "",
      ].join(" ")}
    >
      use<span className="text-amber-400">Popcorn</span>
    </Link>
  );
}
