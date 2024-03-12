import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-2">
      <Link href="/">
        <Image
          src="/next.svg"
          blurDataURL=""
          width={100}
          height={100}
          alt={`${process.env.SITE_TITLE}`}
        />
      </Link>
      <h1 className="text-3xl font-semibold hidden">
        {process.env.SITE_TITLE}
      </h1>
    </div>
  );
};

export default Logo;
