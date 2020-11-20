import { Buffer } from 'buffer';

global.Buffer = Buffer;
const forge = require('node-forge');

export const rsaEncryption = (data, certificate) => {
  const nodeBuffer = Buffer.from(data);
  const publicKey = parsePublicKeyFromCertificate(certificate);
  const encrypted = publicKey.encrypt(nodeBuffer);
  return forge.util.encode64(encrypted);
};

const parsePublicKeyFromCertificate = (certificate) => {
  const inCert = forge.pki.certificateFromPem(certificate);
  return inCert.publicKey;
};
