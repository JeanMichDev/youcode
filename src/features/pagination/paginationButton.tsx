"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export type PaginationButtonProps = {
  page: number;
  totalPage: number;
  baseUrl: string;
};

export const PaginationButton = (props: PaginationButtonProps) => {
  const routeur = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (props.page === 0) {
            return;
          }
          const searchParams = new URLSearchParams({
            page: String(props.page - 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          routeur.push(url);
        }}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          console.log(props.page, props.totalPage);
          if (props.page === props.totalPage) {
            return;
          }
          const searchParams = new URLSearchParams({
            page: String(props.page + 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          routeur.push(url);
        }}
      >
        Next
      </Button>
    </div>
  );
};
