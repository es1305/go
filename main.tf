# Providers
provider "digitalocean" {
  token = var.do_token
}

provider "aws" {
  region     = "eu-west-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

# Variables
locals {
  name        = "es1305"
  hosts       = ["goapp"]
  image       = "ubuntu-18-04-x64"
  size        = "s-1vcpu-1gb"
  region      = "ams3"
  dns_zone    = "devops.rebrain.srwx.net."
  remote_user = "root"
  public_key  = file("~/.ssh/id_rsa.pub")
  private_key = file("~/.ssh/id_rsa")
}

# Execute
data "digitalocean_ssh_key" "rebrain" {
  name = "REBRAIN.SSH.PUB.KEY"
}

resource "digitalocean_ssh_key" "default" {
  name       = local.name
  public_key = local.public_key
}

resource "digitalocean_tag" "devops" {
  name = "devops"
}

resource "digitalocean_tag" "email" {
  name = "es1305_at_mail_ru"
}

resource "digitalocean_droplet" "web" {
  count     = length(local.hosts)
  name      = "${local.name}-${local.hosts[count.index]}"
  image     = local.image
  region    = local.region
  size      = local.size
  tags      = [digitalocean_tag.devops.id, digitalocean_tag.email.id]
  ssh_keys  = [data.digitalocean_ssh_key.rebrain.id, digitalocean_ssh_key.default.fingerprint]

  provisioner "file" {
    connection {
      type        = "ssh"
      host        = self.ipv4_address
      user        = local.remote_user
      private_key = local.private_key
    }
    source      = "hello"
    destination = "/usr/local/sbin/hello"
  }

  provisioner "file" {
    connection {
      type        = "ssh"
      host        = self.ipv4_address
      user        = local.remote_user
      private_key = local.private_key
    }
    source      = "hello.service"
    destination = "/lib/systemd/system/hello.service"
  }

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      host        = self.ipv4_address
      user        = local.remote_user
      private_key = local.private_key
    }
    inline = [
      "chmod +x /usr/local/sbin/hello",
      "systemctl enable hello && systemctl start hello"
    ]
  }

}

data "aws_route53_zone" "selected" {
  name         = local.dns_zone
  private_zone = false
}

resource "aws_route53_record" "new_record" {
  count   = length(local.hosts)
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "${local.name}-${local.hosts[count.index]}.${data.aws_route53_zone.selected.name}"
  type    = "A"
  ttl     = "300"
  records = [digitalocean_droplet.web[count.index].ipv4_address]
}

# Output
output "public_ip4" {
  value = [digitalocean_droplet.web[*].ipv4_address]
}

output "domain_name" {
  value = [aws_route53_record.new_record[*].fqdn]
}
