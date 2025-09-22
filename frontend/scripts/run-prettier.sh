#!/bin/bash

pnpm format-check

if [ $? -ne 0 ]; then
  echo "Formatting issues found."
  read -p "Would you like to fix them now? (y/n): " answer
  if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    echo "Fixing formatting..."
    pnpm format-fix
  fi
fi
