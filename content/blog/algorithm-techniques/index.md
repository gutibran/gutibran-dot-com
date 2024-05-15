---
title: "Algorithm Techniques"
date: 2024-05-13T02:31:51-05:00
description: ""
draft: false
pageType: "post"
postType: "notes"
tags: []
enableBreadcrumbs: true 
enableMathJax: true
enableSyntaxHighlighting: true
enableUtterances: true
enableHeadingAnchors: true 
toc: true
displayTitle: true
---

These are useful "tricks" and techniques that I have discovered in my LeetCode endeavors.

## Matricies

### 2D

#### Getting the `nth` element
To get the `nth` element in matrix, "flatten" the matrix.
```python
def get_index(matrix, n):
    rows = len(matrix)
    cols = len(matrix[0])
    row_index = n // cols
    col_index = n % cols
    return (row_index, col_index)
```