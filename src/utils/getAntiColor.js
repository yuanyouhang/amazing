// 针对rgb格式颜色值
export default function getAntiColor(str) {
  const rgbArr = str.slice(4, -1).split(',').map(i => {
    const num = Number(i)
    if(num < 128) return 255
    else return 0
  })
  return `rgb(${rgbArr.toString()})`
}