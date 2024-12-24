# Design

## Main goals
1. Deliver the three core features.
2. Try to adhere to as many good practices as possible.
3. Maintain automated regression tests.
4. Automate testing and delivery.

## Nice to have
- Proper authentication;
- test environment;
- automated code standards with linters;
- being super LEAN.

## Architecture

### Server
In the beginning use Google Sheet and its API for persistence; make sure to keep the logic around this layer as tin as possible.<br>
~~Do we need a standalone server between the client and the Google Sheet or we can just put all the logic in a Google Action?~~ **NO!**<br>
~~Can one repo be used for both the frontend and the backend? Are the GitHub workflow a concern that limiting?~~ Actually, why not? The contracts are a shared resource; also, there are environment variables like the deployment ID.

Be vary careful not to allow formula submission in the Google Sheet since it could lead to data access and maybe even data manipulation/deletion.

#### Authentication
The Google Authentication library should be used and ony the user ID should be stored. Only set ID should be related to the user's data.

*How do we make sure that the session is valid on the BE? Do we need to?*<br>
If we get the ID from the session we MUST know if the sessions is valid.<br>
If the Web App has access "Anyone with Google account" then all the calls that reach the server should have valid sessions.<br>
For each call that needs Authorization the client needs to pass the Auth token in the request and it should be compared for similarity against the one provided by the GAS API. See: https://developers.google.com/apps-script/reference/script/script-app#getoauthtoken.

I should also think about some sort of CORS policies.

### Client
Angular apps can be deployed to GitHub's page feature: https://v17.angular.io/guide/deployment.

### CI/CD
GitHub action can be used to run unit tests and deploy changes in the app.
