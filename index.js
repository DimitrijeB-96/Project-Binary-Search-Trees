import Tree from './binary-tree.js';

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);

tree.insert(2);
tree.insert(32);

tree.delete(32);
tree.delete(2);


tree.find(5);


tree.prettyPrint(tree.root);


