// 获取一个0~6（不含）的随机整数，且获取到它们的随机权重不一致：0、5（20%），1、4（30%），2、3（50%）
export default function getRandomWeightedInteger() {
  const weights = [0.2, 0.3, 0.5, 0.5, 0.3, 0.2];
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i];
    if (random < cumulativeWeight) {
      return i;
    }
  }
}