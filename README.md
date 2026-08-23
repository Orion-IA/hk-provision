# HK Provision

TanStack Start, React, TypeScript, and Tailwind CSS website for HK Provision.
The production app runs in Docker behind Nginx.

## Local development

Requirements: Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

The Docker image is the production runtime. Build and run it locally with:

```sh
docker compose up --build
```

Open `http://127.0.0.1:3000`.

## Ubuntu VPS deployment with Docker

The files in `deploy/` assume Ubuntu 22.04/24.04, the app at
`/hk-provision`, and the domain `example.com`. Replace both values
before running commands.

1. Point the domain's `A` records at the VPS address. Allow SSH, HTTP, and
   HTTPS in the VPS provider firewall and UFW:

   ```sh
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

2. Install Docker Engine and its Compose plugin. Do not install Node.js on the
   host; Node is included in the Docker image:

   ```sh
   sudo apt update
   sudo apt install -y ca-certificates curl git nginx ufw
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   sudo systemctl enable --now docker
   sudo docker run --rm hello-world
   ```

3. Download and build the project. Use a deploy key or another private Git
   authentication method if the repository is private:

   ```sh
   sudo mkdir -p /hk-provision
   sudo chown "$USER":"$USER" /hk-provision
   git clone YOUR_REPOSITORY_URL /hk-provision
   cd /hk-provision
   docker compose build
   ```

4. Start the container and verify it locally. Compose publishes port 3000 only
   on loopback, so it cannot be reached directly from the internet:

   ```sh
   docker compose up -d
   docker compose ps
   curl -I http://127.0.0.1:3000
   ```

5. Configure Nginx. Replace `example.com` in `deploy/nginx.conf`, then enable
   the site:

   ```sh
   sudo mkdir -p /var/www/certbot
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/hk-provision.conf
   sudo nano /etc/nginx/sites-available/hk-provision.conf
   sudo ln -s /etc/nginx/sites-available/hk-provision.conf /etc/nginx/sites-enabled/hk-provision.conf
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. Install and start the Docker service through systemd. This ensures the
   container returns after a VPS reboot:

   ```sh
   sudo cp deploy/hk-provision.service /etc/systemd/system/hk-provision.service
   sudo systemctl daemon-reload
   sudo systemctl enable --now hk-provision
   sudo systemctl status hk-provision
   ```

7. Issue the free certificate manually with Certbot using the webroot
   challenge. Certbot and Nginx stay on the host; only the app runs in Docker:

   ```sh
   sudo apt install -y certbot
   sudo certbot certonly --webroot -w /var/www/certbot -d example.com -d www.example.com
   ```

   Add the HTTPS server block and certificate directives from
   `deploy/nginx.conf`, change the HTTP location to redirect to
   `https://$host$request_uri`, then run:

   ```sh
   sudo nginx -t
   sudo systemctl reload nginx
   curl -I https://example.com
   sudo certbot renew --dry-run
   ```

## Updating the site

After pushing a tested change:

```sh
cd /hk-provision
git pull --ff-only
docker compose up -d --build --remove-orphans
docker compose ps
```

Useful diagnostics:

```sh
docker compose logs -f hk-provision
docker inspect --format '{{.State.Health.Status}}' hk-provision
sudo journalctl -u hk-provision -f
```

Never commit private keys, passwords, or `.env` files. This site currently has
no required runtime secrets; `.env.example` is provided for future use.
