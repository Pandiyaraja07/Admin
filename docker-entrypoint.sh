#!/bin/sh

/bin/sed -i "s|nginx_server_name|${DOMAIN}|g;s|nginx_http_proxy_pass|${SERVER_URL}|g;s|nginx_https_proxy_pass|${SERVER_URL}|g;" /etc/nginx/conf.d/default.conf

/bin/sed -i "s|env_base_url_hasura|${HASURA_URL}|g;" /usr/share/nginx/html/sgri-web/*.js
/bin/sed -i "s|env_root_url|${SGRI_API}|g;" /usr/share/nginx/html/sgri-web/*.js
/bin/sed -i "s|env_hasura_secret|${HASURA_SECRET}|g;" /usr/share/nginx/html/sgri-web/*.js

nginx -g 'daemon off;'