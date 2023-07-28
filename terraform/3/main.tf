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
  type    = string
  default = "ferdocker89/tezos:latest"
}

variable "name" {
  type    = string
  default = "tezos-dapp2"
}

resource "docker_container" "tezos" {
  image = var.docker_image
  name  = var.name
  ports {
    internal = 5178
    external = 5178
  }

  provisioner "local-exec" {
    when    = destroy
    command = "echo 'Destruction is successful.' >> destruction.txt"
  }

}



# provider "null" {}


# resource "null_resource" "local_exec_example" {
#   provisioner "local-exec" {
#     command = "echo 'This is a local-exec provisioner'"
#   }
# }

# resource "null_resource" "remote_exec_example" {
#   provisioner "remote-exec" {
#     inline = [
#       "echo 'This is a remote-exec provisioner'",
#     ]
#   }
# }


