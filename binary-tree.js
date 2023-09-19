import Node from './node.js';

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.levelOrderTraversal = [];
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

  insert(data, node = this.root) {
    if (node === null) {
      node = new Node(data);
      return node;
    }

    if (data < node.data) {
      node.left = this.insert(data, node.left);
    } else if (data > node.data) {
      node.right = this.insert(data, node.right);
    }

    return node;
  }

  delete(data, node = this.root) {
    if (node === null) {
      return node;
    }

    if (data < node.data) {
      node.left = this.delete(data, node.left);
    } else if (data > node.data) {
      node.right = this.delete(data, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }
    }

    return node;
  }

  find(data, node = this.root) {
    if (data === node.data) {
      return node;
    }

    if (data < node.data) {
      return this.find(data, node.left);
    }

    if (data > node.data) {
      return this.find(data, node.right);
    }

    return node;
  }

  levelOrder(func = this.toArray) {
    this.levelOrderTraversal = [];
    const queue = [];

    if (this.root === null) {
      return;
    }

    queue.push(this.root);

    while (queue.length > 0) {
      const node = queue[0];
      func(this.levelOrderTraversal, node.data);

      if (node.left !== null) {
         queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }

      queue.shift();
    }
    return this.levelOrderTraversal;
  }

  toArray(array, value) {
    array.push(value);
  }

  inorder() {

  }

  preorder() {

  }

  postorder() {

  }

  height() {

  }

  depth() {

  }

  isBalanced() {

  }

  rebalance() {
    
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