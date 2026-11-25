export const IMGBB_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

/**
 * Uploads an image File to ImgBB using multipart/form-data POST
 * and returns the hosted image URL string.
 */
export async function uploadImageToImgBB(file: File): Promise<string> {
  if (!file) {
    throw new Error("No image file selected");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image file size must be less than 5MB");
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Unsupported image format. Please use JPG, PNG, WebP, or GIF.");
  }

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key is not configured");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data?.success) {
    throw new Error(data?.error?.message || "Failed to upload image to ImgBB");
  }

  return data.data.display_url || data.data.url;
}
