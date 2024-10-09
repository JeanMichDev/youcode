import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export type GoBackItemProps = {
  url: string;
  children?: React.ReactNode;
};

export const GoBackItem = ({ url, children }: GoBackItemProps) => {
  return (
    <Link href={url} className="flex flex-row gap-2">
      <ArrowBigLeft size={24} />
      {children ? children : null}
    </Link>
  );
};
