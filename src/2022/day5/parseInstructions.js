const parseInstructions = (lines) => {
  return lines.filter((line = '') => line.startsWith('move'))
}
exports.parseInstructions = parseInstructions
