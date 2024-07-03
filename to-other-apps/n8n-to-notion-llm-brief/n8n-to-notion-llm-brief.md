# Meeting to Notion with n8n
This guide provides a step-by-step setup for an n8n workflow that automates the recording of video meetings, transcribes and summarizes the discussions, and synchronizes these insights directly to a Notion page. It leverages OpenAI's API for data analysis and summarization, and AI Meeting Bot for video meeting recording and data access.

## Prerequisites
- n8n account
- Notion account
- AI Meeting Bot Access
- OpenAI API key

### Step 1: Sign Up and Set Up n8n
1. [Download the workflow](./Workflows/Spoke_API_Example.json)
2. Sign up for an n8n account at [n8n.io](https://n8n.io/)
3. In the dashboard, create a new workflow:
   - Click the three vertical dots
   - Select 'Import from File'
   - Upload the example workflow file

### Step 2: Configure Your AI Meeting Bot Dashboard
1. In your workflow, double-click the **Workflow Trigger** node
2. Click on the **Production URL** tab to reveal the URL
3. Copy the **Webhook URL**
4. In your **AI Meeting Bot** dashboard, navigate to the **Webhook Tab**
5. Paste the Production URL in the webhook input

### Step 3: Configure the OpenRouter Node
1. Double-click the **OpenRouter** node
2. Change the endpoint URL to `https://api.openai.com/v1/chat/completions`
3. In the JSON payload, update the `model` field to your preferred AI model (e.g., `"gpt-3.5-turbo"` or `"gpt-4"`)

### Step 4: Set the OpenAI API Credentials
1. Click the **pencil icon** next to the **Credentials for OpenAI**
2. Enter your OpenAI API key

### Step 5: Set Up Notion Integration
1. Obtain a Notion Access Token:
   - Follow the [integration guide](https://docs.n8n.io/integrations/builtin/credentials/notion/?utm_source=n8n_app)
2. Create a New Database in Notion:
   - Open Notion and create a new database
   - Add the following columns:
     - **Name**: Text
     - **Description**: Text
     - **MeetingDate**: Date
     - **Attendees**: MultiSelect
3. Configure the Notion Node:
   - Right-click on the database in Notion to copy the URL
   - Copy the ID from the URL
   - Double-click on the Notion node in your workflow
   - Update your Database ID to the new ID

### Step 6: Update the Notion token
1. Double-click the **Notion** node
2. Click the **pencil icon** next to the **Credential for Notion API**
3. Enter your Internal Integration Secret

### Step 7: Set Up the Martian API
1. Download the Martian API:
   - Go to [Martian API](./Notion/martian_api/)
2. Create a Render Account Using Your GitHub Account:
   - Navigate to [render.com](https://render.com/) and sign up using GitHub
3. Set Up Your Web Service on Render:
   - Log in to Render and select 'New' > 'Web Service'
   - Choose to build and deploy from a git repository
   - Select your forked repository
   - Click 'Create' to initiate the deployment
4. Configure the Martian API:
   - After deployment, copy the URL Render provides
   - In your workflow, double-click the Martian node
   - Update the node settings with the URL to connect it to Notion

### Step 8: Save and Test Your Workflow
1. Save your workflow
2. Open the form, input the meeting URL and AI Meeting Bot Api Key
3. Test your setup to ensure everything is working

If you encounter any issues, refer back to the steps or reach out for help on the AI Meeting Bot Dashboard.