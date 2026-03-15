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
  npm install
"
# npm install --production
echo "Reloading backend (zero downtime)..."
ssh webcad "systemctl --user restart webcad-backend"

echo "Running health check..."
ssh webcad '
  for i in {1..10}; do
    if curl -fs http://localhost:4000/health > /dev/null; then
      echo "Backend healthy!"
      exit 0
    fi
    echo "Waiting for backend to become ready... ($i/10)"
    sleep 1
  done
  echo "Backend failed to become healthy in time!"
  exit 1
'

echo "Reloading Nginx..."
ssh webcad "sudo nginx -s reload"

echo "Deployment complete!"