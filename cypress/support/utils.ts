export const hexToRgb = (hexType) => {
  // 맨 앞의 "#" 기호를 삭제하기.
  const hex = hexType.trim().replace('#', '');

  // 자리별로 각각 분리해서 배열에 담기.
  const rgb = hex.match(/[a-f\d]{2}/gi);

  // rgb값인 16진수로 변환
  const rbgArray = rgb.map((val) => {
    return parseInt(val, 16);
  });

  return `rgb(${rbgArray.join(', ')})`;
}
