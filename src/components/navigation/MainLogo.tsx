import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-2">
      <Link href="/">
        <div className="flex justify-center items-center">
          <a className="text-5xl font-bold text-Black dark:text-white mr-2">
            MGF
          </a>
          <a className="text-5xl text-Black dark:text-white">Global</a>
        </div>
      </Link>
      <h1 className="text-3xl font-semibold hidden">
        {process.env.SITE_TITLE}
      </h1>
    </div>
  );
};

export default Logo;
