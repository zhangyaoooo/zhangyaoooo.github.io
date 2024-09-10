import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,b as i,d as t,o as n}from"./app-CVd3Wr2C.js";const l={},h=i("h1",{id:"bfc",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#bfc"},[i("span",null,"BFC")])],-1),p=i("ul",null,[i("li",null,"介绍BFC及其应用"),i("li",null,"介绍BFC、IFC、GFC、FFC")],-1),k=t(`<p>BGC，全称 Block formatting contexts，块级格式上下文。</p><p>简单说，就是 <strong>页面中的一块独立渲染区域，有一套自己的渲染规则</strong>，它决定了子元素如何布局，以及与其他元素的关系和相互作用。</p><p>简单说，<strong>BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响</strong>。</p><p>就好比在自己家摆家具，想怎么摆都可以都不会影响到邻居家的家具布局。</p><h2 id="bfc布局规则" tabindex="-1"><a class="header-anchor" href="#bfc布局规则"><span>BFC布局规则：</span></a></h2><ol><li>内部的box会在垂直方向堆叠。</li><li>box垂直方向的距离由margin决定，并且也会出现margin重叠。</li><li>每个盒子左边框紧挨着包含块的左边框，即使浮动元素也是如此。</li><li>BFC的区域不会与浮动box重叠。</li><li>BFC是独立容器，里面的子元素和外面的元素互不影响。</li><li>计算BFC高度时，浮动的子元素也会参与计算。</li></ol><p>标准流中的 body 元素就是一个BFC</p><h2 id="设置bfc" tabindex="-1"><a class="header-anchor" href="#设置bfc"><span>设置BFC</span></a></h2><p>在其他区域，想单独设置一个BFC，有一些方式：</p><table><thead><tr><th>元素或属性</th><th>属性值</th></tr></thead><tbody><tr><td>根元素</td><td></td></tr><tr><td><em>float</em></td><td><em>left、right</em></td></tr><tr><td><em>postion</em></td><td><em>absolute、fixed</em></td></tr><tr><td><em>overflow</em></td><td><em>auto、scroll、hidden</em></td></tr><tr><td><em>display</em></td><td><em>inline-block、table-cell</em></td></tr></tbody></table><blockquote><p>上面只记录了一些常见的方式，完整的 <em>BFC</em> 触发方式可以参阅：<em>https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context</em></p></blockquote><h2 id="bfc用处" tabindex="-1"><a class="header-anchor" href="#bfc用处"><span>BFC用处</span></a></h2><ol><li>解决父元素高度坍塌问题 在正常情况下，不给父元素设置高度的话，父元素高度会由子元素撑开。<br> 但是这时如果给子元素设置了浮动，那么父元素高度会变成0，就撑不起来了。 这时就可以给父元素设置成BFC，就可以解决。</li><li>非浮动元素被浮动元素覆盖 当一个元素box1设置了浮动，box1就会脱离标准流，后面的盒子box2位置就会变，就会重叠。这时就可以给后面的盒子box2设置成BFC。<br> 原理是 <strong>BFC的区域不会与浮动box重叠</strong>。</li></ol><p>基于此特点，我们就可以制作两栏自适应布局，方法就是给固定栏设置固定宽度，给不固定栏开启 <em>BFC</em>。</p><div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;left&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;导航栏&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;right&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;这是右侧&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-highlighter="shiki" data-ext="css" data-title="css" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">.left</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">200</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">vh</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">skyblue</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  float</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">left</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">.right</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">calc</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">%</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 200</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">); </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">vh</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">yellowgreen</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：在上面的代码中，我们要设置两栏布局，左边栏宽度固定，右边栏自适应。结果我们发现右侧出现了空白</p><p>究其原因就是右侧区域与浮动盒子重叠了</p><figure><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-13-063034.png" alt="image-20210913143033581" tabindex="0" loading="lazy"><figcaption>image-20210913143033581</figcaption></figure><p>修改 <em>.right</em> 部分的代码，添加 <em>overflow:hidden</em> 使其成为一个 <em>BFC</em>：</p><div class="language-css line-numbers-mode" data-highlighter="shiki" data-ext="css" data-title="css" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">.right</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">calc</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">%</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 200</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">); </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#E06C75;">vh</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">yellowgreen</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">  overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">hidden</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：因为 <em>BFC</em> 的区域不会与浮动 <em>Box</em> 重叠，所以右侧空白没有了</p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-13-063330.png" alt="image-20210913143330616" style="zoom:50%;"><ol start="3"><li>margin垂直方向重合<br> 经典的margin坍塌问题，不再赘述。</li></ol><p>明白了 <em>BFC</em>，其他的 <em>IFC、GFC</em> 和 <em>FFC</em> 就大同小异了。</p><ul><li><em>IFC</em>（<em>Inline formatting context</em>）：翻译成中文就是“行内格式化上下文”，也就是一块区域以行内元素的形式来格式化</li><li><em>GFC</em>（<em>GrideLayout formatting contexts</em>）：翻译成中文就是“网格布局格式化上下文”，将一块区域以 <em>grid</em> 网格的形式来格式化</li><li><em>FFC</em>（<em>Flex formatting contexts</em>）：翻译成中文就是“弹性格式化上下文“，将一块区域以弹性盒的形式来格式化</li></ul><blockquote><p>更多关于格式化上下文的内容，可以参阅 <em>MDN</em>：</p><p><em>BFC</em>：<em>https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context</em></p><p><em>IFC</em>：<em>https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inline_formatting_context</em></p></blockquote>`,27);function r(d,B){return n(),a("div",null,[h,p,e(" more "),k])}const g=s(l,[["render",r],["__file","BFC.html.vue"]]),m=JSON.parse('{"path":"/exercise/HTML-CSS/BFC.html","title":"BFC","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"1970-01-01T00:00:00.000Z","category":["前端"],"description":"介绍BFC及其应用 介绍BFC、IFC、GFC、FFC","head":[["meta",{"property":"og:url","content":"https://www.topoo.top/exercise/HTML-CSS/BFC.html"}],["meta",{"property":"og:site_name","content":"张耀"}],["meta",{"property":"og:title","content":"BFC"}],["meta",{"property":"og:description","content":"介绍BFC及其应用 介绍BFC、IFC、GFC、FFC"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-13-063034.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-10T03:08:08.000Z"}],["meta",{"property":"article:author","content":"张耀"}],["meta",{"property":"article:published_time","content":"1970-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-10T03:08:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"BFC\\",\\"image\\":[\\"https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-13-063034.png\\"],\\"datePublished\\":\\"1970-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-09-10T03:08:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"张耀\\"}]}"]]},"headers":[{"level":2,"title":"BFC布局规则：","slug":"bfc布局规则","link":"#bfc布局规则","children":[]},{"level":2,"title":"设置BFC","slug":"设置bfc","link":"#设置bfc","children":[]},{"level":2,"title":"BFC用处","slug":"bfc用处","link":"#bfc用处","children":[]}],"git":{"createdTime":1725937688000,"updatedTime":1725937688000,"contributors":[{"name":"zy","email":"zhangyao_base@163.com","commits":1}]},"readingTime":{"minutes":3.15,"words":946},"filePathRelative":"exercise/HTML-CSS/BFC.md","localizedDate":"1970年1月1日","excerpt":"\\n<ul>\\n<li>介绍BFC及其应用</li>\\n<li>介绍BFC、IFC、GFC、FFC</li>\\n</ul>\\n","autoDesc":true}');export{g as comp,m as data};
