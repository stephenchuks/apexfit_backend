#!/bin/bash

# Function to process directories recursively
process_directory() {
    local dir="$1"
    # Display directory header
    echo -e "\n\033[32m=== DIRECTORY: $dir ===\033[0m"
    
    # List directory contents (like 'ls -l')
    ls -l "$dir"
    
    # Process files first
    echo -e "\n\033[33m[FILE CONTENTS]\033[0m"
    while IFS= read -r -d $'\0' file; do
        local filename=$(basename "$file")
        local exclude=0
        
        # Check against exclusion patterns
        for pattern in "${exclude_patterns[@]}"; do
            if [[ "$filename" == $pattern ]]; then
                exclude=1
                break
            fi
        done
        
        if [[ $exclude -eq 0 ]]; then
            echo -e "\n\033[36m---- $filename ----\033[0m"
            cat "$file"
        fi
    done < <(find "$dir" -maxdepth 1 -type f -print0)
    
    # Process subdirectories
    while IFS= read -r -d $'\0' subdir; do
        local dirname=$(basename "$subdir")
        local exclude=0
        
        # Check against exclusion patterns
        for pattern in "${exclude_patterns[@]}"; do
            if [[ "$dirname" == $pattern ]]; then
                exclude=1
                break
            fi
        done
        
        if [[ $exclude -eq 0 ]]; then
            process_directory "$subdir"
        fi
    done < <(find "$dir" -mindepth 1 -maxdepth 1 -type d -print0)
}

# Check for root directory argument
if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <root_directory> [--exclude pattern1 pattern2 ...]" >&2
    exit 1
fi

root_dir="$1"
shift
exclude_patterns=()

# Parse exclusion patterns
if [[ "$1" == "--exclude" ]]; then
    shift
    while [[ $# -gt 0 ]]; do
        exclude_patterns+=("$1")
        shift
    done
fi

# Verify directory exists
if [[ ! -d "$root_dir" ]]; then
    echo "Error: Directory '$root_dir' does not exist" >&2
    exit 1
fi

# Start processing
process_directory "$root_dir"
