#!/bin/bash

# Get ISO 8601 timestamp
build_date=$(date -Iseconds)

# Replace build date using sed
sed -i "s/^buildDate = .*/buildDate = \"$build_date\"/" config.toml
