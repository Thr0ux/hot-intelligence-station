# 热门情报站

这是一个本地网页日报。页面会优先读取 `data/generated-data.js` 中的每日自动更新数据；如果当天没有生成数据，才会显示旧的样例/历史数据或空状态。

## 手动更新

```bash
npm run update:daily
```

脚本会从过去 24 小时的公开新闻数据源抓取候选条目，写入：

```text
data/generated-data.js
```

刷新 `index.html` 后即可看到当天数据和“最后更新”时间。

## 授权 API

复制 `.env.example` 为 `.env`，填入可用密钥：

```bash
cp .env.example .env
```

当前脚本已支持：

- `NEWSAPI_KEY`：优先抓新闻类条目。
- `YOUTUBE_API_KEY`：优先抓影视预告片、颁奖视频、访谈/演讲视频。

未配置授权信息时，脚本会退回到公开源站直采或显示“等待授权”的明确状态，不会生成伪造视频链接。


### 接好后运行

```bash
npm run update:daily
```

运行成功后刷新 `index.html`。自动任务每天早上也会读取同一份 `.env`，所以只要密钥有效，就会自动更新。

## 自动更新

Codex 自动任务已配置为每天早上 07:05 运行同一更新脚本。更新成功后会写入 `data/generated-data.js`，刷新页面即可看到当天内容。

安全保护：

- 如果本次抓取结果为 0 条，脚本会停止写入，避免把现有日报覆盖成空白。
- 每次成功写入后，会同步保存一份 `data/generated-data.backup.js` 作为最近一次成功备份。
- 运行日志在 `logs/daily-update.log`，可用来查看生成条数和被跳过的数据源。

本机 macOS 定时任务模板保留在 `scripts/com.hotintelligence.daily-update.plist`。由于 macOS 会限制后台任务访问“文稿/Documents”目录，只有在给相关终端/脚本完整磁盘访问权限后，才建议启用本机 launchd 方案；默认以 Codex 自动任务为准。

## 分享给别人访问

推荐用 GitHub Pages 发布公网版本。项目已经包含 `.github/workflows/deploy-pages.yml`，上传到 GitHub 后可以自动发布静态网站，并每天北京时间 07:10 自动更新日报数据。

发布时会先生成 `dist/` 目录，只包含：

- `index.html`
- `app.js`
- `styles.css`
- `assets/`
- `data/generated-data.js`

偏好参考文件、抓取脚本、日志和 `.env` 不会作为网站内容发布出去。

### 第一次发布

1. 在 GitHub 创建一个新仓库，例如 `hot-intelligence-station`。
2. 把本项目推送到该仓库的 `main` 分支。
3. 打开仓库的 `Settings` → `Pages`。
4. 在 `Build and deployment` 里选择 `GitHub Actions`。
5. 打开仓库的 `Actions` 页面，运行 `Deploy Hot Intelligence Station`，或等待推送后自动运行。

发布成功后，GitHub Pages 会给出一个公网地址，类似：

```text
https://你的用户名.github.io/hot-intelligence-station/
```

把这个地址发给别人即可访问。

### API Key 填在哪里

不要把 `.env` 上传到 GitHub。发布到 GitHub Pages 后，密钥放在仓库的 Secrets：

1. 打开仓库 `Settings` → `Secrets and variables` → `Actions`。
2. 点击 `New repository secret`。
3. 添加：
   - `NEWSAPI_KEY`
   - `YOUTUBE_API_KEY`

每天自动更新时，GitHub Actions 会读取这些 Secrets。网页前端不会暴露密钥。

### 自动更新逻辑

- `push` 到 `main`：只发布当前网站文件。
- 手动运行 workflow：先更新数据，再发布。
- 每天北京时间 07:10：自动更新 `data/generated-data.js`，提交到仓库，然后发布。

如果某天所有热榜源都抓取失败，更新脚本会失败并保留上一版内容，不会把网站清空。
