import cors from '../src'

(async () => {
  const res = await cors({
    text: 'example',
  })
  console.log(res)
})()