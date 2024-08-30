#!/usr/bin/env bash


PRIVATE_KEY_NAME=https_key
CERTIFICATE_NAME=https_certificate
KEYSTORE_NAME=https_keystore
CA_NAME=koh
ALIAS=kohgateway

# Generate an RSA Private Key and Certificate
openssl genpkey -algorithm RSA \
  -out ${PRIVATE_KEY_NAME}.pem \
  -aes256
openssl req -new \
  -x509 \
  -key ${PRIVATE_KEY_NAME}.pem \
  -out ${CERTIFICATE_NAME}.pem \
  -days 365

# Convert the Private Key and Certificate to PKCS12 Format
echo openssl pkcs12 -export \
  -in ${CERTIFICATE_NAME}.pem \
  -inkey ${PRIVATE_KEY_NAME}.pem \
  -out ${KEYSTORE_NAME}.p12 \
  -name ${ALIAS} \
  -CAfile ${CERTIFICATE_NAME}.pem \
  -caname ${CA_NAME}