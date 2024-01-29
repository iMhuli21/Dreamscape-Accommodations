## Dreamscape-Accommodations
A airbnb clone where people can advertise the places they want to rent out and where people looking for accommodations can search for them. The web application was built using the MERN stack (MongoDB, Express, React, NodeJS).



![Screenshot 2023-09-26 192919](https://github.com/iMhuli21/Dreamscape-Accommodations/assets/101645245/2d753e44-5923-42b4-aed8-223caad3f315)
![Screenshot 2023-09-26 180028](https://github.com/iMhuli21/Dreamscape-Accommodations/assets/101645245/5efe8ef9-7ae8-4329-b089-dbdebb638964)
![Screenshot 2023-09-26 193028](https://github.com/iMhuli21/Dreamscape-Accommodations/assets/101645245/fa9fc20e-08cb-4869-8a13-f6d4a61099a8)
![Screenshot 2023-09-26 193113](https://github.com/iMhuli21/Dreamscape-Accommodations/assets/101645245/40d508ec-38e9-406b-8d9b-615ecf65dcac)

## How to run the app

1. Clone the Repository:
 * Open a terminal or command prompt on your local machine and navigate to the directory where you want to clone the repository. Use the following command to clone the repository:
   git clone <repository_url>
   Replace <repository_url> with the actual URL of your Git repository.

2. Navigate to the Project Directory:
  * Change your current directory to the newly cloned project directory:
  cd <project_directory>
  Replace <project_directory> with the name of the directory where the repository was cloned. 

3. Install Dependencies:
  * Since this application has a separate backend and frontend it has two different folders in which have different packages that need to be installed
  * To do so you will need to first open a terminal on the root directory of the project and cd to the server folder and run the command npm install. Once it has installed all the packages for the backend it          will be time to now cd .. to exit out the server folder then cd client folder for the frontend and run the same command which is npm install. After do so you are finally ready to use the app.
  * Run the following command to install the project dependencies using npm or yarn:
    npm install
       or
      yarn

4. Create an .env file
   * Create an env file in the server folder, create environment variables PORT in which you can put in the port you would like to use for the backend, after create another environment variable called       
     MONGO_DB_URL in which you have add the mongo url you get from mongodb.

5. Run the React.js App:
  * To run this application you would need to first run the backend, to do that you would need to open a terminal and cd into the server folder then run the following script npm run dev, after starting the backend
    you can open another terminal and cd to the client and then run the script npm run dev and the application is good to go.
  * You can start the Next.js development server:
    npm run dev
      or
    yarn dev
    This command will start the development server, and users can view the app by navigating to http://localhost:3000 in their web browser.
