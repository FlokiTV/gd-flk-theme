# gd-flk-theme

past this theme on developer tool console

![console](https://github.com/FlokiTV/gd-flk-theme/blob/main/screen.png?raw=true)

```js
const URL = "https://raw.githubusercontent.com/FlokiTV/gd-flk-theme/main/dist/script.min.js"
fetch(URL)
.then(r => r.text() )
.then(d => eval.call(this, d))
```

# development

```
npm i
npm run dev
```

```js
const URL = "http://127.0.0.1:8000/script.dev.js"
fetch(URL)
.then(r => r.text() )
.then(d => eval.call(this, d))
```

to build run
```
npm run build
```