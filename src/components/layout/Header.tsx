import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Typography } from "@/components/ui/Typography";
import Image from "next/image";
import { AuthButton } from "@/features/auth/AuthButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center">
          <Image src="/images/logo.svg" width={50} height={35} alt="Logo" />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
