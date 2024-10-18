import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { prisma } from "@/lib/prisma";
import { getRequiredAuthSession } from "@/lib/auth";
import { UnauthAlert } from "@/features/auth/UnauthAlert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Typography } from "@/components/ui/Typography";

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function AccountSettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  if (!session) {
    return <UnauthAlert />;
  }

  const updateUser = async (data: FormData) => {
    "use server";
    const name = String(data.get("name"));
    const image = String(data.get("image"));
    const safeData = FormSchema.safeParse({ name, image });
    const userSession = await getRequiredAuthSession(); // on le déclare ici pour être sur qu'il s'agit de la bonne session

    if (!safeData.success) {
      const searchParams = new URLSearchParams();
      searchParams.set(
        "error",
        "Invalid data. Imgage must be an URL and name a string"
      );
      redirect(`/account/settings?${searchParams.toString()}`);
    }

    await prisma.user.update({
      where: {
        id: userSession.user.id,
      },
      data: safeData.data,
    });

    revalidatePath("/account");
    redirect("/account");
  };

  return (
    <Layout className=" m-auto max-w-lg   ">
      <LayoutHeader>
        <LayoutTitle>Account Settings</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent>
            <form action={updateUser} className="flex flex-col gap-2">
              <div>
                <Label htmlFor="imageUrl">Profile Picture</Label>
                <Input
                  name="image"
                  id="image"
                  defaultValue={session.user.image}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" defaultValue={session.user.name} />
              </div>
              {searchParams.error && (
                <Typography>Error : {searchParams.error as string} </Typography>
              )}
              <Button>Update</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
      <CardFooter className="flex flex-row-reverse">
        <GoBackItem url="/" />
      </CardFooter>
    </Layout>
  );
}
