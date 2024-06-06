docker stop $(docker ps -q -f name=microservice-name-queue-1)
docker compose up -d

node --experimental-vm-modules node_modules/.bin/jest --passWithNoTests --watchAll --collect-coverage --no-cache
