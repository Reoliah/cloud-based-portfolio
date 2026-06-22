# Full-Stack Engineering Portfolio & Stateless CMS

A high-performance full-stack portfolio website and dynamic Content Management System (CMS) built to showcase engineering projects and technical literature. This repository demonstrates a complete transition from a coupled local monolith to a containerized, stateless cloud architecture provisioned via Infrastructure as Code (IaC).

**Live Architectural Demonstration:** [Watch the Loom Video ](https://www.loom.com/share/276e87018cd844f68d5ffb4ddc91ce6f)

---

## Technical Stack

### Core Application Tier
* **Frontend:** React (Vite), Tailwind CSS v4, Framer Motion
* **Backend API:** Node.js, Express.js
* **Memory Streaming:** Multer, Multer-S3, AWS SDK for JavaScript v3

### Cloud Infrastructure Tier (AWS)
* **Compute Orchestration:** AWS ECS Fargate (Serverless Containers), AWS ECR
* **Traffic Distribution:** AWS Application Load Balancer (ALB), Amazon CloudFront CDN
* **Persistent Storage:** Amazon S3 (Standard Storage Class)
* **Infrastructure Provisioning:** Terraform (HCL)

---

## System Architecture

The application operates on a fully decoupled, stateless topology:

1. **Edge Caching & Proxy Layer:** Amazon CloudFront acts as the public entry point. Static web requests are routed to an S3 hosting bucket via an Origin Access Control (OAC) protocol. Dynamic API requests (`/api/*`) are intercepted and proxied to the Application Load Balancer.
2. **Isolated Compute Tier:** Backend API containers run inside private VPC subnets with zero direct internet ingress. Compute instances scale horizontally without data loss.
3. **Decoupled Storage Tier:** The backend runtime does not write to local disk. Media uploads and JSON data structures are streamed directly into an Amazon S3 bucket authenticated via least-privilege IAM Task Execution roles.

---

## Repository Structure (Monorepo)

```text
cloud-portfolio/
├── src/                    # React Frontend Source Code
│   ├── components/         # Modular UI Elements
│   └── main.jsx            # Application Entry Point
├── server/                 # Express API Source Code
│   └── index.js            # Stateless Server & AWS SDK Configurations
├── terraform/              # Infrastructure as Code Manifests
│   ├── main.tf             # AWS Network, Security, ECS, and CDN Providers
│   └── variables.tf        # Environment Variable Declarations
├── Dockerfile              # Production Multi-Stage Container Definition
├── .dockerignore           # Container Build Safeguards
├── .gitignore              # Git Manifest Safeguards
└── tailwind.config.js      # Styling Definitions
```

# Local Development and Setup
1. **Clone and Install Dependencies**
```bash
git clone [https://github.com/reoliah/cloud-based-portfolio.git](https://github.com/reoliah/cloud-based-portfolio.git)
cd my-portfolio
npm install
```

2. **Environment Configuration**
Create a `.env` file in the root directory
```Code Snippet
PORT=4000
VITE_ADMIN_PASSWORD=your_secure_password
AWS_REGION=us-east-1
AWS_STORAGE_BUCKET_NAME=your_s3_bucket_name
```

3. **Command Verification (Docker)**
Build and execute the isolated container environment locally before deployment
```bash
docker build -t portfolio-backend:local
docker run -p 4000:4000 --env-file .env portfolio-backend:local
```
4. **Infrastructure Provisioning (Terraform)**
To deploy the AWS cloud infrastructure stack
```bash
cd terraform
terraform init
terraform plan
terraform apply
```
# AWS Setup
1. **AWS account configuration**
```bash
cd ..
aws configure
```
submit required information
2. **Repository Creation and Docker deployment**
```bash
aws ecr create-repository --repository-name your-repository-name
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-repository-name
docker tag portfolio-backend:local your-repository-name:latest
docker push your-repositort-name:latest
```
3. **Build and Pass Static media to s3 bucket**
```bash
npm run build
aws s3 sync dist/ s3://your-frontend-hosting-name --delete
```
