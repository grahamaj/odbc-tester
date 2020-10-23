FROM centos:7
USER root
WORKDIR /myApp

COPY setOdbcDebug.js .
# install build tools, dependencies, node/npm, and odbc
RUN yum -y install centos-release-scl \
  && yum -y install centos-release-scl-rh \
  && yum -y install https://repo.mysql.com//mysql80-community-release-el7-3.noarch.rpm \
  && yum -y install --setopt=tsflags=nodocs --enablerepo=mysql80-community \
  devtoolset-7 \
  mysql-connector-odbc.x86_64\
  rh-nodejs10 \
  unixODBC \
  unixODBC-devel \
  && source scl_source enable devtoolset-7 rh-nodejs10 \
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
ENTRYPOINT ["/opt/rh/rh-nodejs10/root/usr/bin/node", "testApp.js"]
