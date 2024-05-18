---
title: "Leetcode Problem 74 Search a 2d Matrix"
date: 2024-05-13T02:49:28-05:00
description: ""
draft: true
pageType: "post"
postType: "writeup"
tags: []
enableBreadcrumbs: true 
enableMathJax: true
enableSyntaxHighlighting: true
enableUtterances: true
enableHeadingAnchors: true 
toc: true
displayTitle: true
---

## Problem statement
You are given an `m x n` integer matrix `matrix` with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.

You must write a solution in `O(log(m * n))` time complexity.

**Example 1:** 
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/mat.jpg" style="width: 322px; height: 242px;">

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

**Example 2:** 
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg" style="width: 322px; height: 242px;">

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

**Constraints:** 

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

## Initial thoughts

## Solutions

### "Flattening the matrix"
```python
def get_index(self, matrix, index):
    rows =  len(matrix)
    cols = len(matrix[0])
    row_index = index // cols
    col_index = index % cols
    return (row_index, col_index)

def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    start = 0
    end = len(matrix) *  len(matrix[0]) - 1
    while start <= end:
        middle = (start + end) // 2
        row, col = self.get_index(matrix, middle)
        if matrix[row][col] == target:
            return True
        
        if matrix[row][col] < target:
            start = middle + 1
        else:
            end = middle - 1

    return False
```