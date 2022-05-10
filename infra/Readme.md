# Deployment Configuration

Deploy to a k3s cluster, set up using `k3sup`. This has traefik pre-installed

Run `docker-compose up -d` to run a local container registry. It's available on the loopback and cluster-internal interfaces.

Configure the container registry mirrors on each k3s node, then run `sudo systemctl restart k3s` to pick up the change:

```sh
# /etc/rancher/k3s/registries.yaml

mirrors:
  internal.registry:
    endpoint:
      # Or wherever the registry is running
      - "http://felix-cluster:5100"
configs:
  internal.registry:
    tls:
      insecure_skip_verify: true
```

Images are built on the dev machine, pushed to the registry, and downloaded by nodes on deploy.
