import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutButton } from "@/features/auth/LogOutButton";
import { buttonVariants } from "@/components/ui/button";

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) {
    return <p>Session not fount</p>;
  }

  return (
    <div className="m-auto">
      <Card className=" m-auto max-w-lg   ">
        <CardHeader className="flex">
          <CardTitle className="flex flex-row">
            <Avatar className={"mr-2 size-12"}>
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
              {session.user.image && (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name ?? "user Picture"}
                />
              )}
            </Avatar>
            <div className="flex flex-col gap-3 ">
              <p>{session.user.email}</p>
              <CardDescription>{session.user.name}</CardDescription>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/account/settings"
          >
            Settings
          </Link>
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/admin"
          >
            Admin
          </Link>
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <LogOutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
