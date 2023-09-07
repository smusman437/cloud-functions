# Cloud functions
The project includes two types of cloud functions: onRequest and onSchedule. These functions enable you to perform various tasks within your Firebase project, such as handling HTTP requests and executing periodic tasks.

Project Overview
Firebase Cloud Functions
Firebase Cloud Functions are serverless functions that allow you to execute code in response to various events in your Firebase project. In this project, we have implemented two types of Firebase Cloud Functions:

**onRequest Function**:

**Functionality**: This function is triggered by HTTP requests. When an HTTP request is made to the specified endpoint, this function executes and can perform tasks such as processing data, interacting with databases, or sending responses.  
**Usage**: You can use this function for creating custom API endpoints, handling webhook requests, or performing various HTTP-based tasks.

**onSchedule Function**:

**Functionality**: This function is scheduled to run at specific intervals or times using Firebase's scheduling capabilities. It is suitable for tasks that need to be executed on a recurring basis, such as data cleanup, report generation, or notifications.  
**Usage**: You can define the schedule for this function to run daily, weekly, or at custom intervals, depending on your project requirements.

# Getting Started
To get started with this project, follow these steps:

**Clone the Repository**: Clone this repository to your local development environment.

**Install Firebase CLI**: If you haven't already, install the Firebase Command Line Interface (CLI) by running the following command:

```npm install -g firebase-tools```  
**Initialize Firebase Project**: If you haven't set up a Firebase project, initialize Firebase in your project directory using the Firebase CLI:

```firebase init```  
**Deploy Cloud Functions**: Add your onRequest and onSchedule functions to the appropriate files in the functions directory.

**Deploy Functions**: Deploy your Firebase Cloud Functions to your Firebase project by running:

```firebase deploy --only functions```  
**Testing and Monitoring**: Test your onRequest function by making HTTP requests to the provided endpoint. Monitor the execution of your onSchedule function in the Firebase Console to ensure it runs as expected at the defined intervals.

# Configuration
You can configure various aspects of your Firebase Cloud Functions in the firebase.json and functions/index.js files, including endpoint URLs, scheduling intervals, and environment variables.

# Dependencies
Ensure that you have the necessary dependencies installed in your project. You can specify these dependencies in your package.json file.

# Additional Resources
For more information on Firebase Cloud Functions, refer to the Firebase documentation.

# License
This project is licensed under the MIT License.

# Support
If you encounter any issues or have questions about this project, feel free to reach out to the project contributors or open an issue in the repository.

Happy coding!
