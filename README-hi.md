# dsh-session-icons

## 功能

हर DSH बातचीत के लिए SVG आइकन और 20 रंगों में से एक चुनता है; चयनकर्ता, रीसेट, स्थानीय संग्रह और मॉडल टूल शामिल हैं।

## 官方扩展点

`sidebar.session.row.leading`, `sidebar.workspaces.session.menu.item` और `shell.overlay` का उपयोग करता है।

## 开发与验证

`npm run check` और `dsh-plugin-dev check --strict --cwd .` चलाएँ।

## 安装

`dsh plugin --profile web add ./dsh-session-icons` चलाएँ और माँगे जाने पर Web प्रोफ़ाइल पुनः शुरू करें।

## 数据格式

कॉन्फ़िगरेशन `localStorage` की `dsh-session-icons:v1` कुंजी में रहता है।

## 许可

MIT
