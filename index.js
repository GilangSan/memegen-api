import express from 'express'
import generateMeme from './generateMeme.js'

const app = express()
app.use(express.json({ limit: '10mb' })) // untuk menerima base64 besar

app.post('/generate', async (req, res) => {
  const { image, top, bottom } = req.body

  if (!image || !top || !bottom) {
    return res.status(400).json({ error: 'image (base64), top, and bottom are required' })
  }

  try {
    // image diasumsikan base64 string (tanpa prefix data:image/jpeg;base64,...)
    const buffer = Buffer.from(image, 'base64')
    const memeBuffer = await generateMeme(buffer, top, bottom)

    res.set('Content-Type', 'image/jpeg')
    res.send(memeBuffer)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate meme' })
  }
})

app.get('/', (req, res) => {
  res.send({
    isOnline: true,
    status: 'Online',
    message: 'POST JSON to /generate with image (base64), top, and bottom text'
  })
})

const PORT = process.env.PORT || 7860
app.listen(PORT, () => console.log(`🚀 Server ready on port ${PORT}`))
