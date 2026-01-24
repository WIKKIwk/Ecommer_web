"""Tree and graph utilities"""


class TreeNode:
    """Binary tree node"""
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def tree_height(node: TreeNode) -> int:
    """Calculate tree height"""
    if not node:
        return 0
    return 1 + max(tree_height(node.left), tree_height(node.right))


def inorder_traversal(node: TreeNode) -> list:
    """Inorder tree traversal"""
    if not node:
        return []
    return inorder_traversal(node.left) + [node.value] + inorder_traversal(node.right)


def preorder_traversal(node: TreeNode) -> list:
    """Preorder tree traversal"""
    if not node:
        return []
    return [node.value] + preorder_traversal(node.left) + preorder_traversal(node.right)
