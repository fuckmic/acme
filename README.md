# acme
`分为：ui、utils、示例`

- 说明：✅ 已完成、❎ 未完成、❓ 待确认、🟰 等等做、➕ 新增功能、➖ 非使用功能、✖ 移除功能

## styles
- _variables.css

## ui

### common/ 
- ✅ AcmeIcon.vue 仅渲染icon
- ✅ AcmeSvg.vue 突破uniapp中对svg的限制。通用svg的字符串放在utils/svg.js中
- AcmeTag.vue tag
- AcmePage.vue 页面容器层
- AcmeCopyrightVersion.vue 版权信息
- AcmeEmptyData.vue 空数据

### fmt/ 各类数据格式化
- AcmeFmtFiat.vue 法币值
- AcmeFmtInteger.vue 整数值
- AcmeFmtPercent.vue 百分值
- AcmeFmtCryptoAmount.vue 加密币数量
- AcmeFmtCryptoValue.vue 稳定币
- AcmeFmtKMB.vue 金融大数KMB

### form/ 表单组件
- AcmeCheckbox.vue 复选框
- AcmeSwith.vue 开关
- AcmeUpload.vue 上传图片
- AcmeInputText.vue 普通文本
- AcmeInputPassword.vue 密码，带掩码
- AcmeInputSearch.vue 搜索
- AcmeInputFiat.vue 法币。带币符号，小数两位或0位。
- AcmeInputInteger.vue 正整值、数量值。
- AcmePresetSelectorFiat.vue 法币预置值
- AcmePresetSelectorLever.vue 杠杆预置值
- AcmePresetSelectorCrypto.vue 加密币预置值、稳定币预置值
- AcmeLgreSelector.vue 语言选择器
- 
<!-- 
 // 以 type="text" 输入，格式化为合法数值。允许用户按照格式化输入，或输入值自动格式化。
 
 - WtfInputFloat.vue 支持输入整数和小数
 - WtfInputCryptoAmount.vue 仅输入加密币数量，按照lgre格式化。如 'BTC', 'ETH'，高精度小数位。
 - WtfInputCryptoValue.vue 仅输入稳定币值，按照lgre格式化。如 'USDT', 'USDC',通常2-4位小数。
 
 displayValue 和 rawValue 的分离：
 displayValue 绑定到 input 的 :value，用户看到并直接操作。
 rawValue 是用于计算的实际数字，通过 v-model 传递给父组件。

 // 'email', 'phone', 'code'

 UIRadio.vue     单选框
 UISelect.vue    选择器
 -->

### chart/ 图表
- AcmeChartKline.vue (Acme 库的图表组件，具体是 K 线图)
- AcmeChartMiniArea.vue (Acme 库的图表组件，具体是迷你面积图)
- AcmeChartProgressBarSegmented.vue 

### modal/ 模态框/弹窗
- AcmeModalDialog.vue (Acme 库的模态框组件，具体是对话框类型)
- AcmeModalSheet.vue (底部弹出的 Sheet 类型模态框)

### btn/ 按钮
- AcmeBtnPrimary.vue (Acme 库的按钮组件，具体是主按钮)
- AcmeBtnIcon.vue (带图标的按钮)

### nav/ 导航相关组件
- SmallNavItem.vue 竖屏一行一个。[icon  label]
- SmallNavItemArrow.vue 竖屏一行一个。[icon label  arrow]
- AcmeNavBar.vue
- AcmeSideMenu.vue

### tabs/ some tabs
- AcmeTabsBasic.vue 通用的tabs 固定的一行中显示完。
- AcmeTabsScroll.vue 可滚动的tabs  不限量，需计算位移

### data/ 数据相关 （如列表、卡片）
- 
- 
<!-- 
Card.vue
Table.vue 
 -->
### layout/ 布局
<!-- - AcmePage.vue 页面容器层
- AcmeCopyrightVersion.vue 版权信息
- -->
<!-- - header/
- - LargeNavHeader.vue 宽屏顶导航。
- footer/
- - SmallFooter.vue 竖屏底导航。
- - LargeFooter.vue 宽屏底导航。
- LayoutHeader.vue 顶导航
- LayoutFooter.vue 底导航 -->

Txn (Transaction)：交易相关组件（如充值提现）。

## utils
- formatter.js
- locales.js 所有国家国际化配置
- theme.js 主题
- websocket.js ws
- validator.js 表单验证
- svg.js 所有需要动态改变size和color的svg文件

### chart/ 图表相关
- klinechart.js
- u-chart.js

<!-- 
 // your-main-project/main.js
 import Vue from 'vue';
 import App from './App';
 
 // 导入 acme 库的全局配置和主题设置函数
 // 假设您的别名是 `@acme` 指向 wtf 文件夹
 import { wtfConfig, wtfSetTheme } from '@/acme/config.js'; 
 
 // === 关键：在主项目全局导入 acme 的 CSS 变量定义 ===
 // 这将使 acme/_variables.scss 中定义的变量在全局范围内可用
 // 并且可以通过后续的 CSS 规则进行覆盖
 import '@/acme/styles/_variables.scss'; 
 
 // 将 wtfConfig 挂载到 Vue 原型上，方便组件访问
 Vue.prototype.$wtfConfig = wtfConfig;
 
 // === 关键：在主项目设置主题 ===
 // 这会覆盖 acme/config.js 中设置的默认主题
 // 并且会向 body 元素添加 'dark-theme' 或 'light-theme' 类名
 wtfSetTheme('dark'); // 示例：强制主项目使用暗色主题
 
 // 其他初始化代码
 Vue.config.productionTip = false;
 App.mpType = 'app';
 
 const app = new Vue({
     ...App
 });
 app.$mount();
 
  // your-main-project/App.vue
 <template>
 	<div id="app">
 		<router-view></router-view>
 	</div>
 </template>
 
 <script>
 // ...
 </script>
 
 <style lang="scss">
 /* 导入 acme 库的默认变量，确保它们在主项目可用 */
 @import '~@/acme/styles/_variables.scss'; // 确保路径正确
 
 /* === 关键：在主项目级别覆盖 acme 库的 CSS 变量 === */
 /* 这些定义会覆盖 acme/_variables.scss 中的默认值 */
 :root {
   --acme-primary-color: #9C27B0; /* 主项目自定义的主色调 */
   --acme-text-color-primary: #212121; /* 主项目自定义的文本颜色 */
   --acme-bg-page: #f0f4f8; /* 主项目自定义的页面背景色 */
   // ... 覆盖更多 acme 的亮色主题变量
 }
 
 .dark-theme {
   --acme-primary-color: #E040FB; /* 主项目自定义的暗色主题主色调 */
   --acme-text-color-primary: #FAFAFA; /* 主项目自定义的暗色主题文本颜色 */
   --acme-bg-page: #121212; /* 主项目自定义的暗色主题页面背景色 */
   // ... 覆盖更多 acme 的暗色主题变量
 }
 
 /* 其他主项目全局样式 */
 body {
   margin: 0;
   font-family: "Inter", sans-serif;
   /* 使用 acme 的背景色变量 */
   background-color: var(--acme-bg-page); 
   color: var(--acme-text-color-primary);
 }
 </style>
 -->

<!-- 

### chart // 图表相关的 UI 组件 (例如 TradeView 风格的UI)
  `https://www.tradingview.com/`
- WtfKlineChart.vue：图表组件。注册多种自定义Styles，外部传入，渲染不同形式的图表。
- - Tooltip:


- WtfChartMiniKlineArea.vue： 竖屏最精简版。只有Area的Kline。通常用于stock或crypto在列表页中，每条数据的真实走势图。
- WtfChartMiniKlineTimePrice.vue：宽屏精简版。在列表选中单个stock或crypto时渲染。包含Chart自处理的X轴时间跨度、Y轴的价格
- 

- timeTabs/ 图表使用的时间跨度选择器
- - WtfChartTimeTabsMini.vue:宽竖屏通用。底部或顶部[1D|1M|1Y|5Y|All],[分、时、周、月、年]
- - WtfChartTimeTabsScroll.vue: 宽竖屏通用，Scroll，rate%，时间跨度使用完整单词,与rate上下居中。动态判断是否显示rate
- - WtfChartTimeTabsSelectorLarge.vue:宽屏时间按钮点击后出现的列状选项组
- - WtfChartTimeTabsSelectorSmall.vue: 竖屏时间按钮点击后出现的上入选项组

- indicatorTabs/ 图表使用的指标选择器
- - WtfChartIndicatorTabsSelectorLarge.vue:宽屏指标按钮点击后出现的居中弹层选项组
- - WtfChartIndicatorTabsSelectorSmall.vue: 竖屏指标按钮点击后出现的上入选项组

-  WtfChartToolbarMini.vue : 图表工具栏，迷你版 [Area|Candles|Full|settings]

- widgets/ 小部件
-  WtfChartToolbar.vue  // 图表工具栏。对标Tradingview图表的左侧竖列功能组(笔刷、覆盖物、测量、删除等)。可能需要区分Stock和Crypto。

- - stock/ 股票相关小部件
- - - WtfStockPriceTicker.vue 功能： 显示股票代码、最新价、涨跌额、涨跌幅。内部可能组合： WtfText (显示数值)、WtfIcon (显示涨跌箭头)。职责： 专注于股票行情显示，不涉及交易。
  
- - crypto / 加密币相关小部件
- - - WtfCryptoWalletBalance.vue 功能： 显示特定加密币的钱包余额、折合美元价值。内部可能组合： WtfText (显示数值)、WtfIcon (显示币种图标)。职责： 专注于钱包余额展示，不涉及转账或交易。



- 图表设置:齿轮按钮，宽竖屏通用弹层版(Precision、tz、lgre等)


EChart 对标Klinechartjs和tradingview的功能
- ✅ 迷你纯净area小图表。
- 主图技术指标
- 副技术指标
- Tooltip
- X轴时间
- Y轴价格
- 


单个stock或crypto包含：
一个综合的tabsScroll，(概览、图表、新闻、动态、部分数据的图表等)

考虑使用echartjs封装，可兼容多种图表和kline

 -->
 
 <!-- 
 使用
 # 1. uni-app 项目根目录 添加 acme 仓库作为子模块
git submodule add <github-repo-url> acme

提交主项目的更改：
git add .gitmodules acme
git commit -m "Add wtf as a submodule"
git push origin main # 或者您的主分支名称

在主项目中同步 acme 更新时： 更新 acme 子模块到其远程仓库的最新版本
git submodule update --remote --merge

克隆包含子模块的主项目
当新的开发者克隆您的 your-uniapp-project 主仓库时，或者您在另一台机器上克隆时，需要额外的步骤来初始化和克隆子模块内容：
# 1. 克隆主项目 (注意 --recurse-submodules 参数)
git clone --recurse-submodules <main-project-url>

# 如果忘记了 --recurse-submodules 参数，或者主项目已经克隆，之后再想拉取子模块：
# 2. 进入主项目目录
cd your-uniapp-project
# 3. 初始化并更新子模块
git submodule update --init --recursive
# --init: 初始化子模块，将其注册到 .git/config 中
# --recursive: 如果子模块内部还有子模块，也一并初始化和更新
 -->