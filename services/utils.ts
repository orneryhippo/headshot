export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const stripBase64Prefix = (base64Str: string): string => {
  return base64Str.split(',')[1] || base64Str;
};

export const getMimeTypeFromBase64 = (base64Str: string): string => {
  const match = base64Str.match(/^data:(.+);base64,/);
  return match ? match[1] : 'image/jpeg'; // Default to jpeg if not found
};
