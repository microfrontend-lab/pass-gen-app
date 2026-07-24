terraform {
  backend "gcs" {
    bucket = "module-federation-lab-tfstate"
    prefix = "pass-gen-app"
  }
}
