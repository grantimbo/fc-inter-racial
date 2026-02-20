import axios from 'axios';

export interface FBPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
}

export async function getFacebookPosts(): Promise<FBPost[]> {
  const PAGE_ID = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

  const url = `https://graph.facebook.com/v21.0/${PAGE_ID}/feed?fields=id,message,created_time,full_picture,permalink_url&access_token=${ACCESS_TOKEN}&limit=5`;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Facebook API Error:', error);
    return [];
  }
}