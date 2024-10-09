import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { GoBackItem } from "../pagination/GoBackItem";
import { AuthButton } from "./AuthButton";
import { Button } from "@/components/ui/button";

export const UnauthAlert = () => {
  return (
    <Card className="m-auto my-20 w-1/4 text-center">
      <CardHeader>
        <CardTitle>Not logged in</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography className="mb-5">
          You need to be logged in to access this page.
        </Typography>
        <div className="m-auto flex flex-row items-center justify-center gap-10">
          <Button variant="default" size="sm">
            <GoBackItem url="/">
              <p className="my-auto">Go back</p>
            </GoBackItem>
          </Button>

          <AuthButton />
        </div>
      </CardContent>
    </Card>
  );
};
