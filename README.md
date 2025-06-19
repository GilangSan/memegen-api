<h1>Meme Generator API</h1>

Demo:
https://isntlang-memegen.hf.space/

```js
const axios = require('axios')
const fs = require('fs')

;(async () => {
  let media = fs.readFileSync('./example.png')
  let image = media.toString('base64')
  let { data } = await axios.post('https://isntlang-memegen.hf.space/generate', {
    image,
    top: 'your top text',
    bottom: 'your bottom text'
  }, {
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'arraybuffer'
  })
  fs.writeFileSync('./output.png', data)
})()
```
