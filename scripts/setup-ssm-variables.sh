#!/bin/bash

echo "SSM variables setup"

##### api-domain
read -p "[ssm:api-domain] Enter development domain (localhost): " developmentDomain
developmentDomain=${name:-localhost}

read -p "[ssm:api-domain] Enter staging domain (staging.api.marche.com.br): " stagingDomain
stagingDomain=${name:-'staging.api.marche.com.br'}

read -p "[ssm:api-domain] Enter production domain (api.marche.com.br): " productionDomain
productionDomain=${name:-'api.marche.com.br'}

# set api-domain for dev
aws ssm put-parameter --name '/st-marche/dev/api/${microservice-alias}/api-domain' --value $developmentDomain --overwrite --type String
# set api-domain for staging
aws ssm put-parameter --name '/st-marche/staging/api/${microservice-alias}/api-domain' --value $stagingDomain --overwrite --type String
# set api-domain for production
aws ssm put-parameter --name '/st-marche/production/api/${microservice-alias}/api-domain' --value $productionDomain --overwrite --type String

echo "ssm:api-domain sucessffully updated!"
#####
