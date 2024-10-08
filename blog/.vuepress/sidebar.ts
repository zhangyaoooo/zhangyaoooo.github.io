import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "前端",
      icon: "image",
      prefix: "frontEnd/",
      link: "frontEnd/",
      children: "structure",
    },
    {
      text: "练习题",
      icon: "file-pen",
      prefix: "exercise/",
      link: "exercise/",
      children: "structure",
    },
    {
      text: "技术杂谈",
      icon: "laptop-code",
      prefix: "knowledge/",
      link: "knowledge/",
      children: "structure",
    },
    {
      text: "文章杂记",
      icon: "book",
      prefix: "posts/",
      link: "posts/",
      children: "structure",
    },
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
