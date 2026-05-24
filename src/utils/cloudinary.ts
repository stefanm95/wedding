export function optimizeCloudinaryUrl(src: string, width: number) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) {
    return src;
  }

  const uploadToken = "/upload/";
  const [, afterUpload = ""] = src.split(uploadToken);

  if (afterUpload.startsWith("f_auto") || afterUpload.startsWith("q_auto")) {
    return src;
  }

  return src.replace(uploadToken, `${uploadToken}f_auto,q_auto,w_${width}/`);
}
