export interface NotionBlog {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  date?: string;
  author?: string;
}

// This is a placeholder list - you'll replace these with your actual Notion blog IDshttps://alemantrix.notion.site/How-I-Stay-Productive-Using-Notion-1ea0ee8a1a70803993b4de70462ec127
export const notionBlogs: NotionBlog[] = [
  {
    id: '1ea0ee8a1a7080cfb3edd9872298609c',
    title: 'Tools to sing with your MacBook',
    description: 'Discover the best tools and applications to enhance your singing experience using a MacBook.',
    coverImage: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2670&auto=format&fit=crop',
    date: '2023-10-15',
    author: 'Alemantrix'
  },
 
  // These are placeholder entries - replace with your actual Notion blog IDs
  {
    id: '067dd719a912471ea9a3ac10710e7fdf',
    title: 'Notion Test Suite',
    description: 'A comprehensive test suite for Notion pages with various block types and formatting options.',
    coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2670&auto=format&fit=crop',
    date: '2023-11-20',
    author: 'Notion Team'
  },
  {
    id: '3492bd6dbaf44fe7a5cac62c5d402f06',
    title: 'Music Production Tips',
    description: 'Learn how to improve your music production skills with these helpful tips and techniques.',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop',
    date: '2023-12-05',
    author: 'Alemantrix'
  }
];

// Function to get a blog by ID
export function getBlogById(id: string): NotionBlog | undefined {
  return notionBlogs.find(blog => blog.id === id);
}
 
// Function to get all blogs
export function getAllBlogs(): NotionBlog[] {
  return notionBlogs;
}
