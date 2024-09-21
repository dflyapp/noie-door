import { blogList } from "@/utils/blog-list";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const FixedSites: MetadataRoute.Sitemap = [
    {
      url: process.env.PUBLIC_URL_HOSTING || "",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  const DynamicSites: MetadataRoute.Sitemap = blogList.map((blog) => {
    return {
      url: `${process.env.PUBLIC_URL_HOSTING}/bai-viet/${blog.slug}` || "",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });
  return [...FixedSites, ...DynamicSites];
}
