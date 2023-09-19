import Node from './node.js';

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.levelOrderTraversal = [];
    this.inorderTraversal = [];
    this.preorderTraversal = [];
    this.postorderTraversal = [];
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
    this.inorderTraversal = [];
    return this.recInorder();
  }

  recInorder(func = this.toArray, node = this.root) {
    if (node === null) {
      return;
    }

    this.recInorder(func, node.left);
    func(this.inorderTraversal, node.data);
    this.recInorder(func, node.right);

    return this.inorderTraversal;
  }

  preorder() {
    this.preorderTraversal = [];
    return this.recPreorder();
  }

  recPreorder(func = this.toArray, node = this.root) {
    if (node === null) {
      return;
    }

    func(this.preorderTraversal, node.data);
    this.recPreorder(func, node.left);
    this.recPreorder(func, node.right);

    return this.preorderTraversal;
  }

  postorder() {
    this.postorderTraversal = [];
    return this.recPostorder();
  }

  recPostorder(func = this.toArray, node = this.root) {
    if (node === null) {
      return;
    }

    this.recPostorder(func, node.left);
    this.recPostorder(func, node.right);
    func(this.postorderTraversal, node.data);

    return this.postorderTraversal;
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    const leftH = this.height(node.left);
    const rightH = this.height(node.right);
    
    return Math.max(leftH, rightH) + 1;
  }

  depth(data, node = this.root) {
    if (node.data === data.data) {
      return 0;
    }

    if (data.data < node.data) {
      return this.depth(data, node.left) + 1;
    }

    if (data.data > node.data) {
      return this.depth(data, node.right) + 1;
    }
  }

  isBalanced() {
    const nodes = this.inorder();
    for (let i = 0; i < nodes.length; i++) {
      const node = this.find(nodes[i]);
      const leftTree = this.height(node.left);
      const rightTree = this.height(node.right);

      if (Math.abs(leftTree - rightTree) > 1) {
        return false
      }
      return true;
    }
  }

  rebalance() {
    const currentTreeArray = this.inorder();
    this.root = this.buildTree(currentTreeArray);
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