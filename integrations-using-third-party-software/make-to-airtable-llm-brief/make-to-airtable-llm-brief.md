# Automate Meeting Transcription and Summarization with Make and AI Meeting Bot

This guide walks through setting up a Make workflow to automate video meeting recording, transcription, summarization, and synchronization of insights to an Airtable database. It leverages the OpenAI API for data analysis and summarization, and AI Meeting Bot for video meeting recording and data access.

## Prerequisites

- Make account
- Airtable account
- AI Meeting Bot API access
- OpenAI API key

### Step 1: Set Up Make Account

1. Download the [workflows](./Workflows/).
2. Sign up for a Make account at [make.com](http://make.com).
3. From the dashboard, create a new scenario:
   - Click the three horizontal dots and select 'Import Blueprint'.
   - Upload the Airtable Scenario file and save.
4. Rename the workflow (e.g., "Integration Airtable").

### Step 2: Configure Airtable

1. Create an Airtable account:
   - Sign up at [airtable.com](http://airtable.com/).
   - From the dashboard, click "Create" to start a new base.
   - Choose "Start from scratch" and rename the base (e.g., "AI Meeting Bot").
2. Import CSV files:
   - Download the [CSV files](./Airtable/).
   - Click "Add or Import" and select the "Data" CSV file.
   - Rename the table to "Data".
3. Set up additional tables:
   - Repeat the import process for the Form Responses CSV file.
   - Choose "Create new table" during import and rename it to "Form Responses".
4. Configure the "Data" table:
   - Change field types:
     - "Name", "Description": Single Line Text
     - "Summary": Long Text (enable rich text formatting)
     - "MeetingDate": Date
     - "Attendees": Long Text
5. Configure the "Form Responses" table:
   - Change field types:
     - "Meeting Bot Name", "Meeting URL", "Meeting Bot Entry Message": Single Line Text
     - "id": Auto Number
     - "Meeting Bot Image": Attachment
     - "Created Time": Created Time
     - "Created By": Created By
   - Set default values:
     - Meeting Bot Name: Make Meeting Bot
     - Meeting Bot Entry Message: Hello - recording this meeting
6. Create a new form:
   - Open the "Interfaces" tab and click "Start Building".
   - Select "Build a form" and choose the "Form Responses" table.
   - Rename the form (e.g., "Meeting Bot") and click "Publish Form".
   - Select "Anyone on the web" for access and copy the link.

### Step 3: Set Up Airtable in Make

1. In the Make dashboard, select the imported Airtable workflow.
2. Click the Airtable (Watch Responses) node and create a new webhook.
3. Name the webhook (e.g., "Airtable webhook") and copy the address.
4. In Airtable, open your base and go to Interfaces.
5. Select the form, click the title, and enable "Redirect to URL".
6. Enter the webhook URL with `?record_id={record_id}` appended and save.
7. In the Airtable (Get A Record) node, add a connection (OAuth, token, or key).
8. Name the connection (e.g., "Airtable OAuth connection") and choose the base and table.

### Step 4: Set Up Webhook Scenario in Make

1. In the Make dashboard, create a new scenario:
   - Click the three dots and select 'Import Blueprint'.
   - Upload the Webhook Scenario file and save.
2. Rename the scenario (e.g., "Integration Webhook").
3. Click the webhooks node and create a new webhook.
4. Name the webhook (e.g., "AI Meeting Bot webhook") and copy the address.
5. In the AI Meeting Bot dashboard, navigate to the Webhook tab.
6. Paste the Make webhook URL.

### Step 5: Configure the OpenRouter Node

1. Locate and click the OpenRouter node in the workflow.
2. Change the endpoint URL to `https://api.openai.com/v1/chat/completions`.
3. In the JSON payload, update the `model` field (e.g., `"gpt-3.5-turbo"` or `"gpt-4"`).

### Step 6: Set OpenAI API Credentials

1. Click the add button below Credentials.
2. Set `Api Key Parameter Name` to `Authorization`.
3. Type "Bearer" in the key field and paste your OpenAI API key.
4. Click "Create".

### Step 7: Set Up Airtable Token

1. Click the Airtable node in the workflow.
2. Choose the connection used for the Airtable workflow (e.g., "Airtable OAuth connection").
3. Click OK.

### Step 8: Save and Test

1. Save the workflow.
2. Open the form, input the meeting URL and AI Meeting Bot API key, and test the setup.

## Conclusion

Your Make workflow should now be connected to AI Meeting Bot and configured to use the OpenAI API. If you encounter issues, refer back to the steps or seek help on the AI Meeting Bot dashboard.