"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";

export const Breadcrump = () => {
  const pathname = usePathname();
  const paths = pathname?.split("/");

  return (
    <div>
      {paths?.map((path, i) => {
        const url = paths.slice(0, i + 1).join("/");
        const needSlash = i !== paths.length - 1 && i !== 0;

        return (
          <Fragment key={i}>
            <Link href={url}>{path} </Link>
            {needSlash && "/"}
          </Fragment>
        );
      })}
    </div>
  );
};
