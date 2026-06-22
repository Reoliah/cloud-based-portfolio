variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "container_image_url" {
  type        = string
  description = "The AWS ECR repository URL containing the backend image container"
}

variable "admin_password" {
  type        = string
  description = "The portfolio admin password for my dashboard"
  sensitive   = true
}

