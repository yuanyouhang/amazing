const getRandomNum = () => {
  return Math.floor(Math.random() * 256) 
}
const getColor = () => {
  return `rgb(${getRandomNum()},${getRandomNum()},${getRandomNum()})`
}

export default getColor