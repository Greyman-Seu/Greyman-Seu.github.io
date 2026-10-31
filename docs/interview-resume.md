# 在线简历与 PDF

- `/resume`：完整简历；Scholar、联系我旁提供 PDF 下载与在线简历入口。
- `/resume/interview`：独立的两页 A4 模板，浏览器“打印 / 导出 PDF”可另存 PDF。
- `/cv.pdf`：已生成的、可直接下载的 PDF。

网页模板与 PDF 共用 `src/data/resume/interview.json`。在线简历是从完整简历精简出的独立版本，修改完整简历时按需同步该文件。姓名使用已确认的“祝仰坤”。不补充未提供的电话或年龄。
头像直接复用首页的 `src/assets/avatar.png`，主页地址显示完整的 `https://tenstep.top/`，便于纸质阅读。

## 更新 PDF

```bash
python3 -m pip install -r scripts/requirements-resume-pdf.txt
python3 scripts/build-resume-pdf.py
node scripts/check-resume-pdf.mjs
```

生成器使用内置中文字体并嵌入 PDF，保留可选择文本和链接。固定两页，内容溢出会报错，不会静默缩小字号。输出更新 `public/cv.pdf` 和 `src/data/resume/pdf-snapshot.json`；二者和 JSON 一并提交。

构建前会校验源数据、首页头像和 PDF 的 SHA-256，防止在线版本与下载版本不同步。标准站点构建只使用已生成的 PDF，无需安装 Python 依赖。

浏览器导出时使用 A4、关闭浏览器页眉页脚；使用模板按钮可隐藏操作栏。PDF 的版式与在线模板分别适配各自排版引擎，内容保持一致。

下载入口使用 PDF 摘要作为 URL 版本标记，避免主站与浏览器缓存旧版简历。
