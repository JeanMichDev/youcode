import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ToggleActiveUserOnCourseProps = {
  courseId: string;
  user: {
    id: string;
    canceled: boolean;
  };
};

export const ToggleActiveUserOnCourse = ({
  courseId,
  user,
}: ToggleActiveUserOnCourseProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm">
          <Menu size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuItem asChild>
          <form>
            <button
              formAction={async () => {
                "use server";
                const session = await getRequiredAuthSession();
                const courseOnUser = await prisma.courseOnUser.findFirst({
                  where: {
                    userId: user.id,
                    course: {
                      id: courseId,
                      creatorId: session.user.id,
                    },
                  },
                });
                if (!courseOnUser) {
                  return;
                }
                await prisma.courseOnUser.update({
                  where: {
                    id: courseOnUser.id,
                  },
                  data: {
                    canceledAt: user.canceled ? null : new Date(),
                  },
                });

                revalidatePath(`/admin/courses/${courseId}`);
              }}
            >
              {user.canceled ? "Set Active" : "Set Canceled"}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
