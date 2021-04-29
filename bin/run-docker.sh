docker stop dan-kitchen-sink-service
docker rm dan-kitchen-sink-service
docker run -p 9000:9000 -it -d --env-file .env --name=dan-kitchen-sink-service dan-kitchen-sink-service:latest
