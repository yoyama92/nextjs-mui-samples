"use client";

import { LIMIT } from "@/constants";

import { Pagination as MuiPagination } from "@mui/material";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  q?: string;
};

export const Pagination = ({
  totalCount,
  current = 1,
  basePath = "",
  q,
}: Props) => {
  const router = useRouter();
  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    router.push(`${basePath}/p/${value}${q ? `?q=${q}` : ""}`);
  };
  const pages = Array.from({ length: Math.ceil(totalCount / LIMIT) }).map(
    (_, i) => i + 1,
  );
  return (
    <MuiPagination
      count={pages.length}
      page={current}
      onChange={handleChange}
    />
  );
};
