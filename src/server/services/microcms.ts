import type { Blog, MicroCMSQueries, Tag } from "@/types/microcms";

import { createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// Initialize Client SDK.
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

/**
 * ブログ一覧を取得
 * @param queries
 */
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blog",
    queries,
  });
  return listData;
};

/**
 * ブログの詳細を取得
 * @param contentId
 * @param queries
 */
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId,
    queries,
  });
  return detailData;
};

/**
 * タグの一覧を取得
 * @param queries
 */
export const getTagList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Tag>({
    endpoint: "tags",
    queries,
  });

  return listData;
};

/**
 * タグの詳細を取得
 * @param contentId
 * @param queries
 */
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Tag>({
    endpoint: "tags",
    contentId,
    queries,
  });

  return detailData;
};
