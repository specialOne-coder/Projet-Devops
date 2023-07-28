terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

variable "docker_image" {
  type        = string
  default     = "ferdocker89/tezos:latest"
}

variable "name" {
  type        = string
  default     = "tezos-dapp"
}

resource "docker_container" "tezos" {
  image = var.docker_image
  name  = var.name
  ports {
    internal = 5173
    external = 5173
  }
}
