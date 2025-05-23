import API_URL from '../config/api';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/default-event.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads')) return `${API_URL}${imagePath}`;
  if (imagePath.startsWith('/assets')) return imagePath;
  return `/assets/${imagePath}`;
};