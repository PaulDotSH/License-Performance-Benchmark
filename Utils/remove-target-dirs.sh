#!/bin/bash

# Using zenity because for some fucking reason read doesn't work properly
confirm() {
  zenity --question --text="Delete '$1'?" --title="Confirmation"
  if [[ $? -eq 0 ]]; then
    return 0
  else
    return 1
  fi
}

# Function to delete target folders
delete_target_folders() {
  while IFS= read -r -d '' folder; do
    if confirm "$folder"; then
      rm -r "$folder"
      echo "Deleted '$folder'"
    else
      echo "Skipped '$folder'"
    fi
  done < <(find "$1" -type d -name "target" -print0 2>/dev/null)
}

# Prompt for parent directory
parent_dir=$(zenity --file-selection --directory --title="Select Parent Directory")

# Check if parent directory exists
if [[ ! -d "$parent_dir" ]]; then
  zenity --error --text="Error: Parent directory '$parent_dir' does not exist." --title="Error"
  exit 1
fi

# Call delete_target_folders function
delete_target_folders "$parent_dir"
