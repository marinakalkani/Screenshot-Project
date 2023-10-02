const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');
const { Readable } = require('stream');

// Screenshot Machine API Key
const screenshotApiKey = '[your's API KEY]';

// Google Drive API Configuration
const credentials = require('[./your-google-credentials.json']);
const googleDriveFolderId = '[Your's Google Drive Folder ID]';

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  keyFile: '[./your-google-credentials.json'],
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

// List of URLs to capture screenshots
const websites = [
    { id: 1, name: "iFunded", url: "https://ifunded.de/en/" },
    { id: 2, name: "Property Partner", url: "www.propertypartner.co" },
    { id: 3, name: "Property Moose", url: "propertymoose.co.uk" },
    { id: 4, name: "Homegrown", url: "www.homegrown.co.uk" },
    { id: 5, name: "Realty Mogul", url: "www.realtymogul.com" },
];

// Function to capture a screenshot
async function captureScreenshot(website, index) {
  try {
    const url = website.url;
    const options = {
        url: url,          
        width: 1920,        
        height: 1080,        
        format: 'jpg',      
        cacheLimit: '0',
        delay: '0',
        zoom: '200'
      };
      
    const response = await axios.get(`https://api.screenshotmachine.com?key=${screenshotApiKey}&url=${url}`, {
      responseType: 'arraybuffer',
    });

    if (response.status === 200) {
      const screenshotBuffer = Buffer.from(response.data, 'binary');
      const screenshotName = `${website.id}_${website.name}.jpg`;

    // Create a Readable Stream from the screenshotBuffer
    const screenshotStream = new Readable();
    screenshotStream.push(screenshotBuffer);
    screenshotStream.push(null); // Signal the end of the stream

      // Upload the screenshot to Google Drive
      const media = {
        mimeType: 'image/jpg',
        body: screenshotStream,
      };

      const fileMetadata = {
        name: screenshotName,
        parents: [googleDriveFolderId],
      };

      await drive.files.create({ media, resource: fileMetadata });

      console.log(`Screenshot ${index + 1} saved to Google Drive`);
    } else {
      console.error(`Failed to capture screenshot for ${url}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Capture screenshots for each URL
websites.forEach(captureScreenshot);
