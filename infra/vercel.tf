# Vercel Project (imported from existing)
resource "vercel_project" "web" {
  name      = "web"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  build_command    = "cd apps/web && pnpm build"
  install_command  = "pnpm install"
  output_directory = "apps/web/.next"
  root_directory   = "apps/web"
}




# Project domain configuration
resource "vercel_project_domain" "labs_production" {
  project_id = vercel_project.web.id
  domain     = var.vercel_root_domain
}
