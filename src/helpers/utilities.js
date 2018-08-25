/**
 * @desc ellipse text to max maxLength
 * @param  {String}  [text = '']
 * @param  {Number}  [maxLength = 9999]
 * @return {Intercom}
 */
export const ellipseText = (text = '', maxLength = 9999) => {
  if (text.length <= maxLength) return text;
  const _maxLength = maxLength - 3;
  let ellipse = false;
  let currentLength = 0;
  const result = `${text
    .split(' ')
    .filter(word => {
      currentLength += word.length;
      if (ellipse || currentLength >= _maxLength) {
        ellipse = true;
        return false;
      }
      return true;
    })
    .join(' ')}...`;
  return result;
};

/**
 * @desc capitalize string
 * @param  {String} [string]
 * @return {String}
 */
export const capitalize = string =>
  string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

/**
 * @desc shorten address
 * @param  {String} [address]
 * @param  {Number} [num]
 * @param  {Boolean} [showEnd = true]
 * @return {String}
 */
export function shortenAddress(address, num, showEnd = true) {
  const sanitized = address.slice(2);
  const shorten = `${sanitized.slice(0, num)}...${showEnd ? sanitized.slice(-num) : ''}`;
  return '0x'.concat(shorten);
}
