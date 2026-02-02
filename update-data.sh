#!/usr/bin/env bash

JSON_FILE_PATH="./public/data.json"

echo "Reading clipboard..."
CLIPBOARD_CONTENT=$(cat /dev/clipboard)

if echo "$CLIPBOARD_CONTENT" | jq empty > /dev/null 2>&1; then
    echo "Valid JSON detected."
else
    echo "Invalid JSON detected. exiting"
    exit 1
fi

echo "$CLIPBOARD_CONTENT" > "$JSON_FILE_PATH"

echo "Running pnpm build"

if ! pnpm build; then
    echo "pnpm build failed. exiting"
    exit 1
fi

if [ -n "$(git status --porcelain ./public)" ]; then
    echo "Staging files..."
    git add ./public
    
    echo "Committing changes..."
    git commit -m "Update data.json"
    
    echo "Pushing changes to remote..."
    
    if git push; then
        echo "Changes pushed successfully."
        
        echo "Deploying to Github pages..."
        pnpm run deploy
    else
        echo "Failed to push changes to remote."
        exit 1
    fi
fi