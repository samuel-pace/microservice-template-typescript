FROM mcr.microsoft.com/devcontainers/universal:2

# install packages
RUN apt-get update \
  && apt-get upgrade -y \
  # postgres-client
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends postgresql-client postgresql-client-common libpq-dev \
  # powerline fonts for terminal
  && apt-get install -y fonts-powerline

# Default to bash shell (other shells available at /usr/bin/fish and /usr/bin/zsh)
ENV SHELL=/usr/bin/zsh

ARG USERNAME=vscode

# install p10K for ZSH
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git /home/codespace/powerlevel10k \
  && echo 'source /home/codespace/powerlevel10k/powerlevel10k.zsh-theme' >> /home/codespace/.zshrc \
  && echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> /home/codespace/.zshrc \
  # download p10k custom config
  && curl -sLo /home/codespace/.p10k.zsh https://gist.githubusercontent.com/nicolaslima/d050e62641d7b401bbe471b5907d7144/raw/e7e76c4e7ea03c98f422a1266fcaebc38e6b236e/.p10k.zsh
