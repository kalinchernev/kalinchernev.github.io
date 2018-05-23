export default list => {
  const listArray = [];

  // Turn the input into an array.
  Object.keys(list).forEach(item => {
    listArray.push([item, list[item]]);
  });

  // Transform the information to have the count we need.
  const listMapped = listArray.map(tagRecord => {
    const tagLabel = tagRecord[0];
    const tagCount = tagRecord[1].length;
    return [tagLabel, tagCount];
  });

  // Sort
  const sorted = listMapped.sort((a, b) => b[1] - a[1]);

  return sorted;
};
