#!/bin/bash

# https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/
# https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a
# https://web.dev/how-to-use-local-https/

openssl req -x509 \
  -days 99999 \
  -out localhost.crt \
  -keyout localhost.key \
  -newkey rsa:2048 \
  -nodes -sha256 \
  -subj '/CN=localhost' \
  -extensions EXT \
  -config <( printf "[dn]\nCN=localhost\n[req]\ndistinguished_name=dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth" )
