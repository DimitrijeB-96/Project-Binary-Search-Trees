import Node from './node.js';

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  _sortArray(array) {
    const sorted = array.sort((a, b) => a - b);

    return sorted
  }

  _removeDuplicate(array) {
    const filteredArray = array.filter((item, index) => array.indexOf(item) === index);

    return filteredArray;
  }

  buildTree(array) {
    const sorted = this._sortArray(array);
    const filtered = this._removeDuplicate(sorted);
    const root = this.binaryTreeSort(filtered, 0, filtered.length - 1);
  
    return root;
  }

  binaryTreeSort(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.binaryTreeSort(array, start, mid - 1);
    node.right = this.binaryTreeSort(array, mid + 1, end);

    return node;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}