// https://vitepress.dev/guide/custom-theme
import mediumZoom from "medium-zoom";
import { EnhanceAppContext, inBrowser, Theme, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h, nextTick, onMounted, watch } from "vue";
import { BProgress } from "./bprogress";
import "./bprogress.css";
// @ts-ignore: 允许在没有 .vue 类型声明时导入 .vue 文件
import BackToTop from "./components/backtotop.vue";
import "./style.css";
import "vitepress-theme-islands"

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 指定组件使用doc-footer-before插槽
      "doc-footer-before": () => h(BackToTop),
    });
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // 进度条组件
    if (inBrowser) {
      BProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => {
        BProgress.start(); // 开始进度条
      };
      router.onAfterRouteChange = () => {
        BProgress.done(); // 停止进度条
      };
    }
  },
} satisfies Theme;
