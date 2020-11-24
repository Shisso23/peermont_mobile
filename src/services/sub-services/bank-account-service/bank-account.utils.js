export const constructProofOfBankFormData = (proofOfBankDocument) => {
  const imageData = new FormData();
  imageData.append('bank_account[proof_of_banking]', {
    uri: proofOfBankDocument.uri,
    type: proofOfBankDocument.type,
    name: 'proof_of_banking',
  });
  return imageData;
};
