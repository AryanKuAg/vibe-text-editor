import { NotionAPI } from 'notion-client';

// Create a new instance of the Notion API client
// You can add authentication if needed for private pages
const notion = new NotionAPI({
  // If you need to access private pages, uncomment and add your credentials
  // activeUser: process.env.NOTION_ACTIVE_USER,
  // authToken: process.env.NOTION_TOKEN_V2
});

export default notion;
