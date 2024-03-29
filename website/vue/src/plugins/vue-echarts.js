import Vue from "vue";
import ECharts from "vue-echarts";
import { use } from "echarts/core";

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  LegendComponent,
  GridComponent,
  TooltipComponent,
]);

// register globally (or you can do it locally)
Vue.component("v-chart", ECharts);
