import { Article } from "@/components/article/Article";
import { getCaller } from "@/libs/trpc";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk: string;
  };
};

export const revalidate = 60;

const getCachedDetail = cache(
  async (contentId: string, queries?: MicroCMSQueries) => {
    const caller = await getCaller();
    return await caller.microcms
      .getDetail({
        contentId: contentId,
        queries: queries,
      })
      .catch(notFound);
  },
);

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const data = await getCachedDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url || ""],
    },
  };
};

export default async ({ params, searchParams }: Props) => {
  const data = await getCachedDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return <Article data={data} />;
};
