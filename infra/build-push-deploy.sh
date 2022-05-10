#!/bin/bash

TAG=localhost:5100/games:latest

cd $(dirname $0)
set -ex

docker build -t $TAG ..
docker push $TAG
kubectl apply -f k8s/games.yml
kubectl rollout restart deployment games-deployment

set +ex