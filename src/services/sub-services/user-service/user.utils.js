export const constructProofOfProfileDocumentsFormData = (
  proofOfIdDocument,
  proofOfAddressDocument,
) => {
  const imageData = new FormData();

  if (proofOfIdDocument !== undefined) {
    imageData.append('user[proof_of_id]', {
      uri: proofOfIdDocument.uri,
      type: proofOfIdDocument.type,
      name: 'proof_of_id',
    });
  }

  if (proofOfAddressDocument !== undefined) {
    imageData.append('user[proof_of_address]', {
      uri: proofOfAddressDocument.uri,
      type: proofOfAddressDocument.type,
      name: 'proof_of_address',
    });
  }

  return imageData;
};
