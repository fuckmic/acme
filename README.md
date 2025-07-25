# acme
`分为：ui、utils、示例`

- 说明：✅ 已完成、❎ 未完成、❓ 待确认、🟰 等等做、➕ 新增功能、➖ 非使用功能、✖ 移除功能

[](https://inputoutput.dev/svg-to-base64-converter/)
[](https://www.svgviewer.dev/)

## TODO
- 加入代码段。
- 按照UI下的大文件夹分导航和子页面。
- 支持PC布局、竖屏布局。
- UI组件多种css形态
- uni.onWindowResize()


## pages/示例
- icons.vue 所有自定义默认icon
- lgre.vue 所有已包含的lgre配置
- format.vue 函数式数值格式化
- selectors.vue 选择器

## styles
- _colors.scss 包含所有基础的 Sass 颜色变量.
- _elevation.scss 海拔定义0-24
- _variables.css css变量。主项目引入，再引入覆写的变量。
- - 确保所有可变的设计属性（颜色、字体大小、字重、间距、圆角、边框、阴影等）都抽象为 CSS 变量

## intl/ 国际化
- lgres.js lgre代码(语言代码) 
- countryFlag.js 国旗base64
- currencys.js 货币
- fiatCode.js 法币符号
- idcode.js 国际区号
- timezone.js 标准时区
- index.js
- - 最终外部使用 setLgres(['en-US', 'de-DE']);语言易读翻译
- - setLgresSelfNamed(['en-US', 'de-DE']);语言易读不翻译
- 如果是国际区号，则可以单独导入所需，进行对象组装。
### locale/ 区域化
- en-US.js 所有设置英语


## utils/
### fmt/index.js 各类数据格式化。优先从数据层格式化，其次考虑元素结构直接调用
- number.js 数值格式化、反格式化
- string.js 字符串处理
- date.js 日期时间格式化 
 date格式化时根据一个格式字符串，动态配置opt。
例如：format="D-M-Y h:m:s" =》 日月年 时分秒

- locales.js 所有国家国际化配置
- theme.js 主题、 css变量映射颜色值等
- websocket.js ws
- validator.js 表单验证
- svg.js 所有需要动态改变size和color的svg文件

### chart/ 图表相关
- klinechart.js
- u-chart.js


## ui/

### icons/ 组件化一些图标
- ✅ AcmeIconSearch.vue 
- ✅ AcmeIcon[xxx].vue
- AcmeIconMore.vue 更多
- <AcmeIconMenu @click="showMenu" />
<!-- - AcmeIconCountryFlag.vue 国旗base64、法币logo
- AcomeIconCrypto.vue 加密币logo
- AcmeIconStable.vue 稳定币logo -->

### label/ 明文显示
- ✅ AcmeLableStatic.vue 不含事件的明文显示组件(正式上线)
- ✅ AcmeLabelEvent.vue 携带热键和对话框的明文显示组件(部署测试交付)，留一个插槽。
#### 主项目/components文件夹
- ✅ DisplayLabel.vue 主项目全局注册，使用的明文显示组件。内中引入AcmeLableStatic.vue 和 AcmeLabelEvent.vue
- ✅ LabelEdit.vue 明文修改组件。引入AcmeModal.vue。这个对话框，修改明文，并调用接口提交新数据。
- - 也可以选择语言，新增其他语言的数据。后端需要判断，相同语言代码，相同key，是否已存在。




### common/ 
- ✅ AcmeIcon.vue 无需动态改变颜色的图像，通常是非svg。
- ✅ AcmeSvg.vue 突破uniapp中对svg的限制。通用svg的字符串放在utils/svg.js中
- AcmeTag.vue tag
- ✅ AcmePageContainer.vue 页面容器层,主项目全局注册。
- ✅ AcmeCopyrightVersion.vue 版权信息 竖版
- ✅ AcmeEmptyData.vue 空数据 响应式
- ✅ AcmeDivider.vue 分割线。
- ✅ AcmePaper.vue 一些需要指定位置和海拔的组件容器。
- AcmeAccordion.vue 手风琴
- ✅ AcmeAvatar.vue 头像及类头像风格显示
- ✅ AcmeBadge.vue 徽章、online
<!-- - AcmeTheme.vue 主题切换 -->


### nav/ 导航相关组件
<!-- - SmallNavItem.vue 竖屏一行一个。[icon  label]
- SmallNavItemArrow.vue 竖屏一行一个。[icon label  arrow] -->
- ✅ AcmeAppBar.vue 顶部导航，响应式。容器，主项目自行填充内容
- ✅ AcmeBottomNav.vue 底部导航 竖屏版。容器，主项目自行填充内容
#### 主项目/components/
- BottomNav.vue 主项目定制化底导航，竖屏版。含可编辑label

- AcmeDrawer.vue 四方入侧边导航， 通常只有宽屏需要。
- AcmePagination.vue 分页导航 通常只有宽屏需要。
- AcmeStepper.vue 步骤导航
- AcmeTabsFixed.vue 通用的tabs导航 固定的一行中显示完。
- AcmeTabsScroll.vue 可滚动的tabs导航  不限量，需计算位移
- AcmeTabsVertical.vue 竖tabs，通常宽屏使用



 
### inputs/ 各类Input组件
- ✅ AcmeInputText.vue 普通文本
- ✅ AcmeInputPassword.vue 密码，带掩码
- ✅ AcmeInputSearch.vue 搜索
- ✅ AcmeInputFiat.vue 法币。带币符号，小数两位或0位。
- ✅ AcmeInputInteger.vue 正整值、数量值。
- ✅ AcmeInputSearchExpand.vue 聚焦可伸缩
<!-- 
 -  InputFloat.vue 支持输入整数和小数
 -  InputCryptoAmount.vue 仅输入加密币数量，按照lgre格式化。如 'BTC', 'ETH'，高精度小数位。
 -  InputCryptoValue.vue 仅输入稳定币值，按照lgre格式化。如 'USDT', 'USDC',通常2-4位小数。
 // 'email', 'phone', 'code' 
 -->

### form/ 表单组件
- ✅ AcmeCheckbox.vue 复选框
- AcmeSwith.vue 开关
- ✅ AcmeUpload.vue 上传图片，自带预览
- AcmeUploadMini.vue 迷你上传，不带预览
- AcmeDropdownLgre.vue 下拉选择器 语言 。精简的、带搜索的、
- AcmeSlider.vue  滑动条 :value值，抛出值。

### selectors/ 所有选择器
- ✅ AcmePresetGroup.vue 预置值 法币、杠杆、加密币、稳定币。自由列数, 数量较少、无需过滤的预设选项组。
- ✅ AcmeSelectorOption.vue 单个选项，在所有选择器通用。[icon |value|code]
- ✅ AcmeDropdown.vue  点击图标/文字触发的浮层选择器，用于少量、固定的数据选择,不含搜索。只有浮层，不含触发器。
<!-- - 不使用Autocomplete，而是在主项目自由组合。输入框聚焦，自动展开，显示根据输入内容过滤后的选项组。按照统一规范格式传递数据 -->

<!-- - AcmeAutocompleteCountry.vue 国家选择器。输入即过滤、国旗(base64)、国家全称、电话前缀。
- AcmeAutocompleteLgre.vue 语言选择器。输入即过滤、国旗(base64)、语言全称、语言代码。
- AcmeAutocompleteCurrency.vue 法币选择器。输入即过滤、国旗(base64)、货币符号、货币代码。
- AcmeAutocompleteCrypto.vue 加密币选择器。输入即过滤、logo(url)、加密币全称。 -->

<!-- 已经有AcmeModal.vue ，并且可以设置位置(居中或底入)。 -->
- AcmeModalSelector.vue 对话框选择器。底入多用于竖屏（App）,居中通用。
- - AcmeInputText.vue 对话框选择器中的输入框。



- - 如果想要使用过滤和选择器，则使用AcmeAutocomplete系列组件，通过输入框值，实时过滤dropdown内容。


<!-- 
 AcmeRadio.vue     单选框
 AcmeSelect.vue    选择器
 -->

### chart/ 图表
- AcmeChartTooltip.vue 通用的自定义tooltip。解决图表和tooltip重叠问题。
- AcmeChartKline.vue (Acme 库的图表组件，具体是 K 线图)
- AcmeChartMiniArea.vue (Acme 库的图表组件，具体是迷你面积图)
- AcmeChartProgressBarSegmented.vue 

### feedback
- AcmeAlert.vue 
- AcmeModal.vue (Acme 库的模态框组件，具体是对话框类型)
- AcmeModalSheet.vue (底部弹出的 Sheet 类型模态框)
- AcmeSnackbar.vue 也就是toast

### btn/ 按钮
- AcmeButton.vue 按钮
- AcmeBtnPrimary.vue 
- AcmeBtnIcon.vue (带图标的按钮)


### data/ 数据相关 （如列表、卡片）

- 
<!-- 
Card.vue
Table.vue 
 -->
### layout/ 布局
<!-- - AcmePage.vue 页面容器层
- AcmeCopyrightVersion.vue 版权信息
- -->

Txn (Transaction)：交易相关组件（如充值提现）。




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
 
 
 ## 国际化 语言 前端所见即所得 下放指定权限人员可编辑，前后端双重防注入。
### 前端部分
 - 考虑请求失败等情况，回退使用前端默认语言。
 - 在App.vue的onLaunch生命周期里获取一次，全局挂载使用。检测拉取的时间等性能问题。
 - 在切换语言的地方同样执行一次请求。
 - 前端封装两个子组件AcmeLabelEvent.vue(热键唤起对话框，Alt + 鼠标右键)、AcmeLabelStatic.vue(静默显示)。
 - 前端封装组件AcmeLabel.vue，引入以上两个组件，根据项目进度，调整当前使用的label组件。
- AcmeLabelEvent.vue(热键唤起对话框，Alt + 鼠标右键)，注意需鉴权，防止注入攻击或不合法的内容。
- AcmeLabelStatic.vue(静默显示) 正式上线/稳定运行阶段 (无事件绑定)
- 迷你对话框 (编辑界面) 内容：
- - 不可修改信息： 当前语言代码 (e.g., zh-CN)、当前语言名称 (e.g., 简体中文)、当前明文字段 Key (e.g., home.title)、desc(通常是中文释义)。这些信息帮助用户了解他们正在修改的是哪个文案。
- - 可修改内容： 允许用户输入新的翻译文本的输入框。
- 提交与更新： 提交动作： 用户修改后点击“提交”按钮。
- 前端刷新： 提交成功后，前端重新请求当前页面的国际化文案数据，或者局部更新当前显示在页面上的文案，从而实现“所见即所得”的立即生效效果。

### 后端部分
 - 后端建表:id(唯一键)、lgre(语言代码)、label_key(明文的对应key)、value(明文)、desc(备注)。即，每个明文的每种语言一条数据 。
 `{id:1,lgre:'en-US',label_key:'nav.home',value:'Home',desc:'导航.首页'}`
 - 使用/api/translations 以及请求头中的"language": "en-US"来拉取全部指定语言的json，直接为前端可用个格式
- api/translations?id=1&value=NewValue。来提交label明文更改。后端需加入鉴权与防注入检查。
- 版本控制/操作日志： 对于关键的文案，可以考虑在后端实现简单的版本控制或操作日志，记录每次修改的内容、修改人和时间。这在出现问题时便于追溯和回滚。
 
 ```js
 // 拿到并处理为前端使用格式为：
 export const enUS = {
	"home.title": "Home Title",
	"nav.home": "Home",
 }
 ```
 