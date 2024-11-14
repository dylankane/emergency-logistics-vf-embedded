# VF Embedded bot Template README
## A Template for setting up a Voiceflow integration app for a live embedded bot into a webpage (Wordpress)

### Overview
This application is a Node.js backend server that integrates with a Voiceflow conversational backend to manage a chatbot's conversation logic. The backend is connected to a frontend JavaScript-based custom UI that is embedded into web pages, such as WordPress. The backend processes user inputs, manages session state, and communicates with Voiceflow, while the frontend handles user interactions and presents a conversational interface.

---

### Helper Chat GPT : 
https://chatgpt.com/g/g-6734bf6de0fc8190b59d0a245243de69-vf-embedded-application

---
### Setting Up the Template Repository

1. Create New Repository Using Template:
   - On GitHub, click on "Use this template" button on the template repository page.
   - Name your new repository and click "Create repository from template".

2. Clone the New Repository (or click on open a codespace or gitpod enviroment if available):

   - Open a terminal and use the HTTPS or SSH link to clone the newly created repository:

   `git clone <YOUR_NEW_REPO_URL>`

   - Move into the project directory:

   `cd <YOUR_NEW_REPO_NAME>`

3. Install Dependencies:

   - Ensure you have Node.js installed. Version 18+ is recommended.
   - Install the necessary dependencies by running:

   `npm install`

4. Configure Environment Variables:

   - Create a .env file in the root directory:

   `touch .env`

   - Populate it with the following variables (replace with your actual values):

   `VOICEFLOW_API_KEY=your_voiceflow_api_key_here
   VOICEFLOW_VERSION_ID=your_voiceflow_version_id_here
   PORT=5000 (optional, defaults to 5000 if not set)`

5. Run the Server Locally:

   - To start the server locally, run:

   `npm run dev`

   - The server will be accessible on http://localhost:5000.

6. Integrate Frontend UI with Your Website:

   - Copy the frontend HTML and JavaScript code from the README.
   - Insert it into your website where you want the chatbot UI to appear (e.g., in a WordPress footer using a plugin).

### Running and Testing:
- Access Locally: Open http://localhost:5000 and interact with the backend.
- Deploy: Deploy the project to a hosting service like Heroku or similar, and update your frontend to use the deployed API endpoint.

---
### Technical Overview
This template helps you set up an integration between a Voiceflow chatbot and a custom user interface (UI) embedded into a webpage, such as a WordPress site. The server application serves as the backend that facilitates communication between a chatbot created in Voiceflow and users interacting with it on your website.

#### Main Function of the `server.js` File
The `server.js` file defines a server application that acts as the backend for a chatbot integrated with Voiceflow. Below is an overview of its key features:

#### Dependencies and Configurations
- **Express**: Used to create the server and handle HTTP requests.
- **Axios**: Used to make HTTP requests to Voiceflow's API.
- **CORS**: Used to handle Cross-Origin Resource Sharing (CORS) issues, allowing the chatbot to function seamlessly across different origins.
- **dotenv**: Loads environment variables from a `.env` file to keep sensitive data secure.

#### Middleware Setup
- **CORS Handling**: The server uses `cors()` to allow requests from any origin. Additional headers are added to allow specific methods and headers from the site where the bot is embedded.
- **JSON Parsing**: `express.json()` middleware is used to parse incoming JSON request bodies.

#### Chat Handling Endpoint (`/api/chat`)
- **Handling User Messages**: Handles `POST` requests to manage communication between the chatbot UI and Voiceflow.
- **Session State Check**:
  - Checks if a session state exists for the given `userID` by making a `GET` request to Voiceflow's state endpoint.
  - If no session exists, sends a launch action to initiate the session.
- **Sending User Messages or Metadata**:
  - Constructs a payload containing either the user message or metadata and sends it to Voiceflow via a `POST` request.
- **Error Handling**: Logs any errors that occur during communication with Voiceflow and responds with an error message to the client if needed.

#### Server Listening
The server listens on the port defined in the `.env` file or defaults to port `5000` if no environment variable is specified.

#### Key Features
- **Session Initialization**: Automatically checks if a session exists and starts a new session if necessary.
- **CORS Configuration**: Ensures proper handling of requests originating from your website.
- **Dynamic Metadata Handling**: Sends metadata such as page URL and language on page load, enabling the bot to adapt responses based on the user's context.

This backend setup ensures that the bot can receive user messages, initiate sessions when needed, and relay data between Voiceflow and users, while addressing browser compatibility via CORS settings.

#### Website Integration (WordPress-Based)
1. **Footer Script Setup**
   - Add the code from `footer-code.js` to the footer of your WordPress site using a code snippets plugin or similar tool.
   - Ensure the script is wrapped in `<script>` tags.

2. **Add Chat Placeholder**
   - To embed the chat on specific pages, add the following placeholder HTML element:
     ```html
     <div id="chat-placeholder"></div>
     ```
   - Insert this element on each page where you want the chatbot to be embedded.

### Setup Instructions for Creating a New Version of the Voiceflow Chatbot Integration Template

1. **Clone the Template Repository**
   - Clone this template repository to create a new project using HTTPS, SSH, or GitHub CLI.
   - Example: `git clone <repository_url>`

2. **Install Dependencies**
   - Navigate to the project directory.
   - Run `npm install` to install all the necessary dependencies.

3. **Create and Set Up Environment Variables**
   - Create a new `.env` file in the project root.
   - Copy the contents from the provided `.env example file` and update it with your specific details:
     - Set `PORT` to your desired server port (e.g., `5000`).
     - Replace `VOICEFLOW_VERSION_ID` with your Voiceflow project version ID.
     - Replace `VOICEFLOW_API_KEY` with your Voiceflow API key.

4. **Deploy the Application**
   - You can choose to deploy the app using Heroku or any other deployment platform:
     - For Heroku:
       - Log in using `heroku login`.
       - Run `heroku create` to create a new Heroku app.
       - Push the repository to Heroku using `git push heroku main`.
   - Alternatively, use Docker or any server hosting service to deploy your backend.

5. **Update Frontend Script for Integration**
   - Embed the chatbot UI on the desired web pages.
   - Ensure the URL for the deployed backend endpoint is correctly set in the global JavaScript frontend script (replace the placeholder with your deployed backend URL). Two places where this has to be added send initial message and send messages functions,

6. **Test the Application**
   - Open the deployed web page containing the chatbot UI.
   - Verify the following:
     - The initial welcome message is received correctly.
     - User inputs are sent and responses are received.
     - Metadata (e.g., URL and language) is handled correctly on page load.

7. **Customize for Your Use Case**
   - Modify the frontend UI and backend logic as needed for your specific requirements.
   - Update Voiceflow conversational flows to match the features and scenarios you need.

8. **Commit Changes**
   - After making modifications, make sure to commit and push your changes:
     - `git add .`
     - `git commit -m "Custom modifications for project"`
     - `git push origin main`

9. **Voiceflow Set-up**
- 


# IMPORTANT
- Make sure all secret api keys are in the .env file and the .env file is added to the .gitignore file.
- These secrets have to be added to your deployed version through enviroment ssecrets

## Console Logs server.js
Its recommended to remove all console logs that are present in the server.js file after testing is complete, and deployed version is working, make sure to re-deploy after removing console.logs however here is information on each log if you wish to keep some and mabe modify some. Make sure no sensitive info is being logged.

1. console.log('State data for user:', userID, stateData);

- Purpose: Logs the state data for a given user ID after the session check. This helps verify whether an existing session was found for the user.
- Development Use: Useful for debugging purposes to see if the bot has retained session data and if it's correctly identifying users.
- Production Recommendation: Remove or disable in production. It contains session-related information, and while not highly sensitive, it can reveal unnecessary details about user interactions. It might also clutter your logs.
- Security Considerations: Since it may contain identifiable session details, it's better to avoid logging this in a live environment. 

2. console.log('Session launched for user:', userID);

- Purpose: Logs a confirmation that a new session has been successfully launched for a user.
- Development Use: This is useful to confirm that new sessions are being properly initialized, particularly when users enter the chat for the first time.
- Production Recommendation: Remove after ensuring that session launching works correctly. Once the flow is verified, this adds little value in production and may clutter logs.
- Security Considerations: Logging user IDs might pose a privacy risk. In production, it’s best to disable it or replace it with more general logging that doesn’t include user-identifiable information.

3. console.log('Launch response:', launchResponse.data);

- Purpose: Logs the response data received from Voiceflow when a new session is launched. Helps verify if the session has been initialized properly.
- Development Use: Very useful in development to verify the payload that Voiceflow returns during the launch phase.
- Production Recommendation: Remove or disable in production, as it may contain session-related details that aren’t useful in a live environment.
- Security Considerations: Could potentially expose session data, which may include some information not intended for public access.

4. console.log('Payload sent to Voiceflow:', { request: { type: 'text', payload: payload } });

- Purpose: Logs the message payload that is sent to Voiceflow. This helps verify that messages and metadata are being sent correctly.
- Development Use: Extremely useful for debugging communication issues between the server and Voiceflow.
- Production Recommendation: Remove or replace with a simplified log message in production. It’s good for verifying that a message has been sent but should avoid logging specific content.
- Security Considerations: Since this logs the payload (which might contain user-entered information or metadata like URLs and languages), it could reveal information you don’t want exposed.

5. console.error('Error launching session for user:', userID, { ... });

- Purpose: Logs an error if there is an issue launching the session, including detailed error information.
- Development Use: Useful for understanding failures during the session launch phase.
- Production Recommendation: Keep but possibly sanitize the output. Logging detailed errors is useful for identifying problems, but you should ensure no sensitive user data is logged.
- Security Considerations: Logging errors is important for monitoring. However, make sure it doesn’t contain user-identifiable information unless essential for debugging.

6. console.error('Error communicating with Voiceflow:', { ... });

- Purpose: Logs an error if the server has trouble communicating with Voiceflow, including detailed information about the error.
- Development Use: Essential for identifying communication problems.
- Production Recommendation: Keep but sanitize it to ensure it does not include sensitive details. Ensure only relevant error messages are logged without exposing sensitive payloads.
- Security Considerations: Avoid logging sensitive parts of the error response, especially user data or API keys.

7. console.log(Server is running on port ${PORT});

- Purpose: Logs a confirmation message when the server starts, specifying the port it’s running on.
- Development Use: Useful to verify that the server is running and the port is correctly configured.
- Production Recommendation: This can be kept in production, as it doesn’t reveal any sensitive information.
- Security Considerations: Safe to keep since it provides operational information rather than user-specific data.

### Summary

- Logs to Keep for Development Only:
console.log('State data for user:', userID, stateData);
console.log('Session launched for user:', userID);
console.log('Launch response:', launchResponse.data);
console.log('Payload sent to Voiceflow:', { request: { type: 'text', payload: payload } });

- Logs Recommended for Production (Modified for Security):
console.error('Error launching session for user:', userID, { ... }); – Modify to sanitize user data.
console.error('Error communicating with Voiceflow:', { ... }); – Modify to limit sensitive information.
console.log(Server is running on port ${PORT}); – Safe for general use.


## Console Logs frontend script
The same applies here that probably best to remove all, but here is more in-depth inforamation about each consoe log.

1. console.log('Chat placeholder not found.');

- Purpose: This log is used to notify if the placeholder element for the chat UI (chat-placeholder) is not found on the page.
- Development Use: Helpful to identify missing or incorrect element IDs during development.
- Production Recommendation: Remove in production. It is mainly useful during the setup stage to ensure the chat container exists. After confirming everything works correctly, this message can be removed to avoid unnecessary noise in the console.

2. console.log('Voiceflow Response:', data); (Initial request on page load)

- Purpose: Logs the response from the backend after the initial page load request. This helps verify that Voiceflow is responding as expected when initiating the chat.
- Development Use: Useful for confirming that the initial backend response is correctly received and formatted.
- Production Recommendation: Remove in production. It logs the entire response object, which might include sensitive information, and thus should be avoided in a production environment.

3. console.log('Voiceflow Response:', data); (After user sends a message)

- Purpose: Logs the response received from Voiceflow after the user sends a message.
- Development Use: Essential for debugging any issues in user-bot interactions and verifying the backend response.
- Production Recommendation: Remove in production. Similar to the previous log, this could expose details of the conversation or other sensitive data.

4. console.error('Error sending initial message to backend:', error);

- Purpose: Logs an error message if the initial request to the backend on page load fails.
- Development Use: Very useful for debugging failed communication with the backend.
- Production Recommendation: Keep in production, but sanitize if needed. This log is helpful to identify server errors or connectivity issues. Ensure sensitive information is not exposed.

5. console.error('Error sending user message to backend:', error);

- Purpose: Logs an error if sending a user's message to the backend fails.
- Development Use: Crucial for understanding why user messages may fail to reach the backend.
- Production Recommendation: Keep in production, but sanitize if needed. This helps identify issues during ongoing interactions between users and the chatbot.

### Summary
For production deployments:

1. Remove or Comment Out:

- console.log('Chat placeholder not found.');
- console.log('Voiceflow Response:', data); (both occurrences)

These statements should be removed as they are primarily for development purposes and could reveal information about the state or content of user interactions.

2. Keep but Modify:

- console.error('Error sending initial message to backend:', error);
- console.error('Error sending user message to backend:', error);

These should be retained to help with debugging production issues but sanitized so that no sensitive data is leaked. For production, consider using a proper logging service (e.g., Sentry) instead of console.error, which would offer more structured error monitoring.