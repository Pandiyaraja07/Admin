#!/bin/bash

docker build -t registry.gitlab.com/sgri/sgri-web .

docker push registry.gitlab.com/sgri/sgri-web

docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
