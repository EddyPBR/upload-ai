# Upload-AI-Web

**Summary:**

Upload-AI-Web is a web-based application that leverages the power of artificial intelligence to create concise summaries of uploaded videos. This project aims to simplify the process of extracting key insights and information from video content, making it easier for users to grasp the essence of their videos quickly.

**Features:**

- **User-Friendly Interface:** Our user interface is intuitive and straightforward, allowing users to effortlessly upload their video files.

- **AI-Powered Summarization:** The core of this project utilizes advanced AI algorithms to analyze video content, generating coherent textual summaries.

- **Efficient Video Processing:** Our system handles video processing tasks such as key frame extraction, object recognition, and speech analysis to enhance summarization accuracy.

- **Instant Results:** Users receive instant access to a summary of their video content, saving time and effort in content comprehension.

- **Deployment-Ready:** We provide deployment scripts and configurations for easy hosting and accessibility online.

- **Comprehensive Documentation:** Detailed documentation is available to guide users through setting up and using the application, including explanations of AI models and algorithms employed.

Upload-AI-Web is your solution for quickly obtaining meaningful insights from your video content. Experience the future of video summarization with our AI-powered platform.

## Frontend Setup

To run the frontend of this project, follow the steps below. Ensure that you have "pnpm" installed on your system. If you don't have it, you can install it by following the instructions at [pnpm.io](https://pnpm.io).

### Step 1: Navigate to the "web" Directory

Open your terminal and change the directory to the "web" directory of this project:

```shell
cd web
```

### Step 2: Create a .env File

Create a .env file based on the provided .env.example file inside the "/api" directory. You can do this manually or by using the terminal:

```shell
cp .env.example .env
```

Edit the .env file and set the following environment variables:

VITE_API_URL: The url of the api running on.

### Step 3: Install Dependencies

Next, use "pnpm" to install the project dependencies. Make sure you are in the "web" directory when you run this command:

```shell
pnpm install
```

### Step 4: Start the Development Server

Once the dependencies are installed, you can start the development server to run the frontend:

```shell
pnpm run dev
```

This command will start the development server, and you should see output indicating that your frontend is running. By default, the development server usually listens on port 3000. You can access the application by opening your web browser and navigating to http://localhost:3000.

That's it! You've successfully set up and launched the frontend of this project.

## Backend Setup

To run the backend of this project, follow the steps below:

### Step 1: Navigate to the "/api" Directory

Open your terminal and change the directory to the "/api" directory of this project:

```shell
cd api
```

### Step 2: Create a .env File

Create a .env file based on the provided .env.example file inside the "/api" directory. You can do this manually or by using the terminal:

```shell
cp .env.example .env
```

Edit the .env file and set the following environment variables:

PORT: The port on which the backend server will listen.
DATABASE_URL: The URL or connection string to your database.
OPENAI_KEY: Your OpenAI API key (if applicable).

### Step 3: Install Dependencies

Use "pnpm" to install the project dependencies. Make sure you are in the "/api" directory when you run this command:

```shell
pnpm install
```

This command will download and install all the necessary backend dependencies.

### Step 4: Start the Development Server

Once the dependencies are installed, you can start the development server to run the backend:

```shell
pnpm run dev
```

This command will start the backend server, and you should see output indicating that your backend is running. By default, the server usually listens on the port specified in your .env file.

That's it! You've successfully set up and launched the backend of this project. Your backend server is now ready to handle requests. Make sure the frontend (if applicable) is configured to communicate with this backend server.

## Getting an API Key from OpenAI

To access OpenAI's services and use their API, you'll need to obtain an API key. Follow these steps to get your API key from the OpenAI website:

### Step 1: Sign Up or Log In

If you don't already have an OpenAI account, go to the OpenAI website at [https://www.openai.com](https://www.openai.com) and sign up for an account. If you have an account, log in.

### Step 2: Navigate to the API Section

Once you are logged in, navigate to the API section of the OpenAI dashboard. You can usually find this under a menu labeled "API" or "Developers."

### Step 3: Create a New API Key

In the API section, you should have the option to create a new API key. Look for a button or link that says something like "Create New API Key" or "Generate API Key."

### Step 4: Provide Details

Follow the prompts to create your API key. You may need to provide some details about your intended usage, agree to OpenAI's terms of service, and possibly enter payment information if required.

### Step 5: Obtain the API Key

After completing the necessary steps, you should receive your API key. It's typically a long string of characters and numbers. Keep this API key secure and do not share it publicly.

### Step 6: Configure Your Application

To use your API key in your application, you will typically need to set it as an environment variable or use it in your API requests, depending on the programming language and framework you are using. Refer to OpenAI's documentation for details on how to use the API key in your specific application.

That's it! You now have an API key from OpenAI, and you can start using their services in your projects.
