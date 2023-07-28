terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.6.1"
    }
  }
}

provider "docker" {
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}


resource "docker_network" "bridge" {
  name   = "my_bridge_network"
  driver = "bridge"
}

variable "docker_image" {
  type    = string
  default = "nginx:latest"
}


resource "docker_container" "bridge_container" {
  name  = "my_bridge_container"
  image = var.docker_image

  network_mode = docker_network.bridge.id

  ports {
    internal = 90
    external = 9000
  }
  volumes {
    container_path = "/data"
    host_path      = "/host/data"
    read_only      = false
  }
}

resource "docker_container" "host_container" {
  name  = "my_host_container"
  image = var.docker_image

  ports {
    internal = 80
    external = 8000
  }
  depends_on = [
    docker_container.bridge_container
  ]
  volumes {
    container_path = "/data"
    host_path      = "/host/data"
    read_only      = false
  }
}

// Deploying grafana to kube

resource "kubernetes_namespace" "grafana" { # create a namespace
  metadata {
    name = "grafana"
  }
}

resource "kubernetes_deployment" "grafana" { # create a kube deployment
  metadata {
    name      = "grafana"
    namespace = kubernetes_namespace.grafana.metadata[0].name
  }

  spec {
    selector {
      match_labels = {
        app = "grafana"
      }
    }

    template {
      metadata {
        labels = {
          app = "grafana"
        }
      }

      spec {
        container {
          image = "grafana/grafana:latest"
          name  = "grafana"

          port {
            container_port = 3000
          }
        }
      }
    }

    replicas = 1
  }
}

resource "kubernetes_service" "grafana" { # create a kube service
  metadata {
    name      = "grafana"
    namespace = kubernetes_namespace.grafana.metadata[0].name
  }

  spec {
    selector = {
      app = "grafana"
    }

    port {
      name        = "http"
      port        = 70
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}