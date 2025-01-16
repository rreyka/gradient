# Gradient Network Bot - Comprehensive Tutorial

> 👨‍💻 Developer: Xiaolin (@yoyomyoyoa)

## 🌟 What is this?

This is a tool that helps you automate earning points on Gradient Network. It can:
- Automatically log in to your account
- Maintain online status
- Run 24/7
- Support proxy IPs

## 🎯 Preparation

### 1. Register a Gradient Network Account
- Click here to register: [Gradient Network Signup](https://app.gradient.network/signup?code=VV3TZE)
- Remember your email and password as you’ll need them later.

### 2. Purchase Proxy (Highly Recommended)
1. Visit [Proxy-Cheap](https://app.proxy-cheap.com/r/puD3oz)
2. Register and log in
3. Select the Static Residential type of proxy
4. After purchase, you will get a proxy address similar to this:
   ```
   socks5://username:password@proxy_address:port
   ```

### 3. Prepare a Server
- Recommended OS: Ubuntu VPS
- Memory: 1GB or more
- Suggested providers: [Vultr](https://www.vultr.com/) or [DigitalOcean](https://www.digitalocean.com/)

## 📝 Installation Steps

### Step 1: Connect to Your Server

#### For Windows Users:
1. Download and install [PuTTY](https://www.putty.org/)
2. Open PuTTY
3. Enter your server’s IP
4. Click "Open"
5. Enter your username (usually `root`) and password

#### For Mac/Linux Users:
1. Open the terminal
2. Type: `ssh root@your_server_ip`
3. Enter the password

### Step 2: Install Necessary Software

Copy the following commands and run them in the server terminal:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install necessary tools
sudo apt install -y curl wget git screen

# Install Chrome dependencies
sudo apt install -y fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 libcairo2 libcups2 libdbus-1-3 libdrm2 libexpat1 libgbm1 libglib2.0-0 libnspr4 libnss3 libpango-1.0-0 libx11-6 libxcb1 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils

# Download and install Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verify installation
google-chrome --version
docker --version
```

### Step 3: Download and Run the Program

1. Download the program:
```bash
# Clone the repository
git clone https://github.com/rreyka/gradient
cd gradient
```

2. Create a screen session (to ensure the program continues running even if SSH disconnects):
```bash
screen -S gradient-bot
```

3. Build and run the Docker container (replace the placeholders with your details):
```bash
# Build Docker image
sudo docker build . -t gradient-bot .

# Run the container
sudo docker run -d --name gradient-bot -e APP_USER=your_gradient_email -e APP_PASS=your_gradient_password -e PROXY=socks5://proxy_username:proxy_password@proxy_address:port -e DEBUG=true --restart always gradient-bot
```

4. View runtime logs:
```bash
sudo docker logs -f gradient-bot
```

5. Press `Ctrl + A`, then `D` to keep the program running in the background.

## 🔍 How to Check if the Program is Running Properly

1. Reconnect to the program interface:
```bash
screen -r gradient-bot
```

2. Check the running status:
```bash
docker ps
```
If you see the `gradient-bot` container status as `Up`, the program is running properly.

3. View the latest logs:
```bash
sudo docker logs -f gradient-bot
```

## ❓ FAQ

### 1. How to know if it’s running correctly?
- Running `docker ps` shows the container is online
- There are no red error messages in the logs
- Points are increasing on the website after logging in

### 2. Where to buy proxies?
Recommended: [Proxy-Cheap](https://app.proxy-cheap.com/r/ksvW8Z):
- Choose Static Residential type
- Good stability and affordable prices
- Multiple payment methods supported

### 3. What should I do if I encounter issues?
- Check if your network is working
- Ensure your account credentials are correct
- View the runtime logs to identify errors
- Join our group chat for assistance

## 📱 Contact

- Developer: Xiaolin
- Twitter: [@yoyomyoyoa](https://twitter.com/yoyomyoyoa)

## ⚠️ Notes

1. Use reliable proxy services
2. Regularly check the program’s running status
3. Ensure the server remains stable and online
4. This project is for educational purposes only
5. Stop and remove old containers:
   ```bash
   docker stop gradient-bot
   docker rm gradient-bot
   ```
