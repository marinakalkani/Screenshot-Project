# Screenshot-Project

# Web Page Screenshot Capture and Storage in Google Drive with Javascript

This project is designed to capture screenshots of web pages and store them in Google Drive. It uses the Screenshot Machine API to capture screenshots and the Google Drive API to store them.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your system.
- Screenshot Machine API Key: You'll need an API key from Screenshot Machine for this code to work.
- Google Drive API Credentials: You need to create a JSON credentials file for the Google Drive API and download it.

## Installation Instructions

1. Download the project code to a folder on your computer.
2. Install the necessary dependencies using the `npm install` command.
3. Replace `screenshotApiKey` with your own API key from Screenshot Machine.
4. Replace `credentials` with your own JSON credentials file from the Google Drive API.
5. Set `googleDriveFolderId` to the folder in Google Drive where you want to store the screenshots.

## How to Use

To use this code, follow these steps:

1. Run the program using the `node screenshot.js` command.
2. The website screenshots will be captured and saved in the Google Drive folder you specified.

## Sources

- [Screenshot Machine API](https://screenshotmachine.com/)
- [Google Drive API](https://developers.google.com/drive)
