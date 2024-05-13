---
title: "Mastering Go Notes"
date: 2024-05-12T02:09:42-05:00
description: "My notes from the book \"Mastering Go\" by Mihalis Tsoukalos."
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

## What is Go?
- open source systems programming language
- initially developed as an internal Project which then went public in 2009
- Robert Griesemer, Ken Thomson, and Rob Pike
- designed for writing reliable, robust, and efficient software that is easy to manage
- comes with rich standard library, type system, and good compiler
- portable (code works on all platforms, compiler handles this)

## The benefits of using Go
- unicode support is built in
- 25 reserved keywords
- concurrency capabilities (goroutines and channels)
- rich standard library, type system, compiler, portability
- go packages (executable binaries)
- easy to read, predictable
- support for pointers, no pointer arithmetic (can do with unsafe package)
- interfaces and generics
- garbage collector (no manual memory management)

## When to use Go
- 

## Installing go
```bash
# install dependencies
sudo apt-get install curl git mercurial make binutils bison gcc build-essential -y

# run install script
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

# reload bashrc
source ~/.bashrc
```

This is how to install the latest version of go as of 2024-05-12T03:34:41-05:00 which is the time that I am writing this sentence. The process is kind of "fucky" but this is what worked for me.
```bash
gvm install go1.4 -B
gvm use go1.4
export GOROOT_BOOTSTRAP=$GOROOT

gvm install go1.17.13
gvm use go1.17.13
export GOROOT_BOOTSTRAP=$GOROOT

gvm install go1.20.6
gvm use go1.20.6
export GOROOT_BOOTSTRAP=$GOROOT

gvm install go1.22.3
gvm use go1.22.3
export GOROOT_BOOTSTRAP=$GOROOT

go version
```

## Using `go doc` and `godoc`
View official documentation in the command line. View the [official documentation](https://pkg.go.dev/). `go doc` is equivalent to the `man` command but it is for Go. `go doc` is not installed by default. Go package binaries are installed in `~/go/bin`. Add `~/go/bin` to the `$PATH` variable.

### `go doc`
```bash
go install golang.org/x/tools/cmd/godoc@latest
go doc fmt.Printf
go doc fmt
```

### `godoc`
`godoc` starts a local webserver. Takes a port number as a parameter to serve the documentation with the local webserver on that port. If not `-http` parameter is set, it will default to port 6060. View the documentation in a web browser at `http://localhost:8001`.
```bash
godoc -http=:8001
```

## Hello, world in Go
```go
package main
import {
    "fmt"
}

func main() {
    fmt.Println("Hello, world!")
}
```

This how to compile Go program.
```bash
go helloWorld.go
```
