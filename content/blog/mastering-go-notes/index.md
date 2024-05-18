---
title: "Mastering Go Notes"
date: 2024-05-12T02:09:42-05:00
description: "My notes from the book \"Mastering Go\" by Mihalis Tsoukalos."
draft: true
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

## Chapter 1: A Quick Introduction to Go

### What is Go?
- open source systems programming language
- initially developed as an internal Project which then went public in 2009
- Robert Griesemer, Ken Thomson, and Rob Pike
- designed for writing reliable, robust, and efficient software that is easy to manage
- comes with rich standard library, type system, and good compiler
- portable (code works on all platforms, compiler handles this)

### The benefits of using Go
- unicode support is built in
- 25 reserved keywords
- concurrency capabilities (goroutines and channels)
- rich standard library, type system, compiler, portability
- go packages (executable binaries)
- easy to read, predictable
- support for pointers, no pointer arithmetic (can do with unsafe package)
- interfaces and generics
- garbage collector (no manual memory management)

### When to use Go

### Installing go
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

### Using `go doc` and `godoc`
View official documentation in the command line. View the [official documentation](https://pkg.go.dev/). `go doc` is equivalent to the `man` command but it is for Go. `go doc` is not installed by default. Go package binaries are installed in `~/go/bin`. Add `~/go/bin` to the `$PATH` variable.

#### `go doc`
```bash
go install golang.org/x/tools/cmd/godoc@latest
go doc fmt.Printf
go doc fmt
```

#### `godoc`
`godoc` starts a local webserver. Takes a port number as a parameter to serve the documentation with the local webserver on that port. If not `-http` parameter is set, it will default to port 6060. View the documentation in a web browser at `http://localhost:8001`.
```bash
godoc -http=:8001
```

### Hello, world in Go
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
go build helloWorld.go
```

### Functions
- everything that begins witha a lower case letter is considered private and is accessible by the current package (file) only
- package names do not follow this rule

### Packages
- packages that are executable (main file) should have their package defined as main
- import keyword is used import packages obviously, packages within the standard library are imported like this `import "os"` and external packages are imported with their full URL like this `import "github.com/spf13/cobra"`.

### Compiling Go programs
- go build creates an executable, requires manual execution
- specify output name/path with `-o`, defaults to the name of the package
- if no source file is provided Go will look in the current directory for a main file
```bash
go build
```

### "Interpreting" Go programs
- it is not really interpreted, it automates the compilation and run process into a single command `run`
- it compiles the source file into temporary executable file, executes that file, and then deletes the executable
- good for testing
```bash
go run
```

### Code formating rules
there are more rules but these are the most fundamental / important ones that need to be followed as of now
- if you import a package, one should use it or Go compiler will complain
- either use a variable or do not declare it at all
- there is only one way to format curly braces in go
- all coding blocks are embedded in curly braces
- functions can return multiple values
- cannot automatically convert between different data types

