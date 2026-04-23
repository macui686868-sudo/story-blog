// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Story = defineDocumentType(() => ({
  name: "Story",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    date: { type: "string", required: true },
    // 改为 string
    updated: { type: "string", required: false },
    // 改为 string
    category: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    // required 改为 false
    coverImage: { type: "string", required: false },
    author: { type: "string", required: false },
    featured: { type: "string", required: false }
    // 改为 string
    // likes: { type: 'string', required: false },  // 暂时注释掉
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^stories\//, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Story]
});
export {
  Story,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-XXDP4ZF6.mjs.map
