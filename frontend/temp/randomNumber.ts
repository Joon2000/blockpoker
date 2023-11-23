export function getRandomNumber(): number {
  // 1에서 10까지의 랜덤한 정수 생성
  const randomNumber = Math.floor(Math.random() * 10) + 1
  return randomNumber
}
