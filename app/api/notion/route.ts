import { NextRequest, NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

// Create a Notion client instance
const notion = new NotionAPI();

export async function POST(request: NextRequest) {
  try {
    // Get the page ID from the request body
    const { pageId } = await request.json();
    
    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch the page data from Notion
    const recordMap = await notion.getPage(pageId);
    
    // Return the data
    return NextResponse.json({ recordMap });
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Notion page' },
      { status: 500 }
    );
  }
}
