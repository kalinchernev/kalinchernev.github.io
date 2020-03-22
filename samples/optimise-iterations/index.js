const nodes = require('./nodes.json');
const selected = require('./selected.json');

const result1 = [];
const result2 = [];
const userSelectedImages = selected.Images;

const getImageOriginalName = image => {
  const {
    image: { src },
  } = image;

  const originalName = src.split('/img/')[1];

  if (originalName) return originalName;
};

console.time('result1');
userSelectedImages.forEach(image => {
  const originalName = getImageOriginalName(image);

  const imageData = nodes.find(node => {
    if (node.node.fluid.originalName === originalName) return node;
  });

  if (imageData) result1.push(imageData);
});
console.timeEnd('result1');

console.time('result2');
const nodesMap = new Map();
nodes.forEach(node => {
  nodesMap.set(node.node.fluid.originalName, node);
});
userSelectedImages.forEach(image => {
  const originalName = getImageOriginalName(image);

  const imageData = nodesMap.get(originalName);

  if (imageData) result2.push(imageData);
});
console.timeEnd('result2');

// console.log('result1', result1);
// console.log('result2', result2);

// console.log('result1.length', result1.length);
// console.log('result2.length', result2.length);
