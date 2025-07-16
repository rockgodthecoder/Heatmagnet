import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }
    
    // For now, return a placeholder HTML structure
    // This will be replaced with actual PDF conversion logic
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Content</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            margin: 20px; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
            padding-bottom: 20px; 
            border-bottom: 2px solid #eee;
        }
        .content { 
            background: #f9f9f9; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 20px;
        }
        .placeholder { 
            color: #666; 
            font-style: italic; 
            text-align: center; 
            padding: 40px 20px;
        }
        .file-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PDF Content Viewer</h1>
        <p>Interactive lead magnet content</p>
    </div>
    
    <div class="file-info">
        <h3>File Information</h3>
        <p><strong>Filename:</strong> ${file.name}</p>
        <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
        <p><strong>Type:</strong> ${file.type}</p>
    </div>
    
    <div class="content">
        <div class="placeholder">
            <h2>PDF Content Will Be Displayed Here</h2>
            <p>This is a placeholder for the converted PDF content.</p>
            <p>The actual PDF-to-HTML conversion will be implemented with:</p>
            <ul style="text-align: left; display: inline-block;">
                <li>Text extraction and formatting</li>
                <li>Page-by-page content display</li>
                <li>Interactive elements for better engagement</li>
                <li>PostHog analytics integration</li>
            </ul>
        </div>
    </div>
    
    <script>
        // PostHog analytics tracking
        if (typeof window !== 'undefined' && window.posthog) {
            window.posthog.capture('pdf_content_viewed', {
                filename: '${file.name}',
                fileSize: ${file.size}
            });
        }
    </script>
</body>
</html>`;
    
    return NextResponse.json({ html: htmlContent });
    
  } catch (error) {
    console.error('PDF conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert PDF to HTML', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 