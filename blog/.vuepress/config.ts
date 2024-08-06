import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "张耀",
  description: "张耀的知识博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
