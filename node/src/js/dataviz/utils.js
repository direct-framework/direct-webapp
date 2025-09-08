export function splitTextToFitWidth(text, maxWidth, fontSize) {
  const newLabel = text.split(' ').reduce((acc, word) => {
    const testLine = acc.length === 0 ? word : `${acc[acc.length - 1]} ${word}`
    const testLineWidth = testLine.length * (fontSize * 0.6) // Approximate width of text in pixels
    if (testLineWidth > maxWidth) {
      acc.push(word)
    } else {
      if (acc.length > 0) acc[acc.length - 1] = testLine
      else {
        acc.push(testLine)
      }
    }
    return acc
  }, [])
  return newLabel
}
