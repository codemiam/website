#!/bin/sh

# docker build -t codering/ui .
# docker tag codering/ui:latest $(minikube ip):5000/codering-ui
# docker push $(minikube ip):5000/codering-ui
# kubectl create ns codering
kubectl apply -f .k8s/deployment.yaml
kubectl apply -f .k8s/service.yaml

# To access the app:
#kubectl get pods --namespace codering
#kubectl port-forward frontend-1750318887-g9h2w 8080:80 --namespace todos
# Or, because the pod contains a single container:
kubectl port-forward -n codering $(kubectl get pods -n codering -o jsonpath='{.items[0].metadata.name}') 3000:80

# head over to http://localhost:3000 to see the production build hosted on the cluster :)
