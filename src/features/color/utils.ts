export const isDarkish = (color: string): boolean => {
  let r, g, b;

  if (color.match(/^#([A-Fa-f0-9]{3}){1,2}$/)) {
    let colorArray = color.substring(1).split("");
    if (colorArray.length === 3) {
      colorArray = [
        colorArray[0],
        colorArray[0],
        colorArray[1],
        colorArray[1],
        colorArray[2],
        colorArray[2],
      ];
    }
    r = parseInt(colorArray.slice(0, 2).join(""), 16);
    g = parseInt(colorArray.slice(2, 4).join(""), 16);
    b = parseInt(colorArray.slice(4, 6).join(""), 16);
  } else if (color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) {
    const result = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (result) {
      r = parseInt(result[1], 10);
      g = parseInt(result[2], 10);
      b = parseInt(result[3], 10);
    } else {
      throw new Error(`Invalid color format: ${color}`);
    }
  } else {
    throw new Error(`Invalid color format: ${color}`);
  }

  const brightness = Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
  return brightness >= 100;
};
