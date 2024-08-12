To boot the app, clone the repo, go to the frontend directory, and run npm install command( needs node package manager.).

Then run the app with **npm run dev**. App is running on localhost:5173
***App will not run without the backend!*** Currently it is implememnted via db.json.

Backend is started from calling  **npm run server** command in the fronted directory.

If you want to try working with own backend, endpoints are located in the .env file.

If unsure how connection works, app axios connection w/ backend is located in  */src/services/file.js*
