FROM centos:7
USER root
WORKDIR /myApp
ENV NODE_VERSION=10.21.0

COPY setOdbcDebug.js .
# install build tools, dependencies, node/npm, and odbc
RUN yum -y install centos-release-scl \
  && yum -y install https://repo.mysql.com//mysql80-community-release-el7-3.noarch.rpm \
  && yum -y install --setopt=tsflags=nodocs --enablerepo=mysql80-community \
  devtoolset-7 \
  mysql-connector-odbc.x86_64 \
  unixODBC \
  unixODBC-devel \
  && curl https://raw.githubusercontent.com/creationix/nvm/v0.36.0/install.sh | bash \
  && export NVM_DIR="$HOME/.nvm" \
  && \. "$NVM_DIR/nvm.sh" \
  && \. "$NVM_DIR/bash_completion" \
  && source scl_source enable devtoolset-7 \
  && nvm install $NODE_VERSION \
  && npm init -f \
  && npm install odbc \
  # rebuild odbc with the debug flag set
  && npm install node-pre-gyp -g \
  && node setOdbcDebug \
  && cd node_modules/odbc \
  && node-pre-gyp rebuild

# setup odbc files and install test app
COPY odbcinst.ini /etc/
COPY odbc.ini /etc/
COPY testApp.js .
ENTRYPOINT "/root/.nvm/versions/node/v$NODE_VERSION/bin/node" testApp
