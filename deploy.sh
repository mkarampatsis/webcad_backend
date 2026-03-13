#!/bin/bash
set -e

echo "Compiling TypeScript..."
tsc

echo "Syncing backend to server..."
rsync -avz --delete \
  --exclude=node_modules \
  --exclude=.git \
  . webcad:~/projects/webcad-backend/

echo "Installing production dependencies on server..."
ssh webcad "
  source ~/.nvm/nvm.sh &&
  cd ~/projects/webcad-backend &&
  npm install --production
"
echo "Deployment complete!"