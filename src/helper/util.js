const limitWords = (text, limit) => {
  if (!text) return '';
  return (
    text.split(' ').slice(0, limit).join(' ') +
    (text.split(' ').length > limit ? '...' : '')
  );
};

function bookShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function getRandomItems(array, count) {
  // Shuffle the array and take the first `count` items
  const shuffled = bookShuffle([...array]); // Create a copy of the array to avoid mutating the original
  return shuffled.slice(0, count);
}

export { limitWords, bookShuffle, getRandomItems };
