export default list => {
  const listArray = [];

  // Turn the input into an array.
  for (const item in list) {
    listArray.push([item, list[item]]);
  }

  // Transform the information to have the count we need.
  const listMapped = listArray.map(tagRecord => {
    const tagLabel = tagRecord[0];
    const tagCount = tagRecord[1].length;
    return [tagLabel, tagCount];
  });

  // Sort
  const sorted = listMapped.sort(function(a, b) {
    return b[1] - a[1];
  });

  return sorted;
};
