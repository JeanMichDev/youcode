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
import { toggleActiveUser } from "./toggleActiveUser";

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
                await toggleActiveUser(user, courseId);
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
