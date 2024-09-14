import { Errors } from "@/components/Errors";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    key: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `${params.slug}のページ`,
  };
};

export default ({ params, searchParams }: Props) => {
  if (searchParams.key !== process.env.ERROR_SECRET) {
    notFound();
  }
  return <Errors status={Number.parseInt(params.slug)} />;
};
