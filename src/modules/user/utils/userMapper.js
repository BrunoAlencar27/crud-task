export function userMapper(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileUrl: user.profileImageKey ? keyToUrl(user.profileImageKey) : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function keyToUrl(key) {
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
