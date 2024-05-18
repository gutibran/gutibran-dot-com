---
title: "LeetCode problem 704 \"Binary Search\" Writeup"
date: 2024-05-11T19:58:42-05:00
description: "My writeup on LeetCode problem 704 \"Binary Search\"."
draft: true
pageType: "post"
postType: "writeup"
tags: ["computer science", "algorithms and data structures"]
enableBreadcrumbs: true 
enableMathJax: true
enableSyntaxHighlighting: true
enableUtterances: true
enableHeadingAnchors: true 
toc: true
displayTitle: true
---

## Problem statement

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:** 

```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

**Example 2:** 

```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

**Constraints:** 

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- All the integers in `nums` are **unique**.
- `nums` is sorted in ascending order.

## Initial thoughts
The solution is obvious, implement a binary search function. The `O(log n)` runtime requirement confirms it.

## Solutions
Binary search can be implemented iteratively or recursively. The main idea is to define or redefine state variables on each iteration of the binary search which are the variables for the "search window". `start`, `middle`, and `end`. On each iteration check if the middle is equal to the element that is being searched for. If the middle element is equal return the index, otherwise the "search window" nees to be adjusted based on if the middle element is greater than or less than the element to be searched for. If the middle element is less than the target element, move the "search window" to the left otherwise move the "search window" to the right. This will continue until the entire list has been searched through. If the element is not in the array then return -1 or whatever you want to use to signal that the element was not found.

### Iterative binary search
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        start = 0
        end = len(nums) -1
        while start <= end:
            middle = (start + end) // 2
            if nums[middle] == target:
                return middle
            
            if nums[middle] < target:
                start = middle + 1
            else:
                end = middle - 1
        return -1
```

### Recursive binary search
```python
class Solution:
    def bs(self, nums, start, end, target):
        # base case
        if start > end:
            return -1

        middle = (start + end) // 2
        if nums[middle] == target:
            return middle
        
        if nums[middle] < target:
            return self.bs(nums, middle + 1, end, target)
        else:
            return self.bs(nums, 0, middle - 1, target)
        
    def search(self, nums: List[int], target: int) -> int:
        return self.bs(nums, 0, len(nums) - 1, target)
```