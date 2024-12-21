#Book Friends
An application that allows its users to:
- crete list of he books they read or are currenty reading;
- write notes for each book; and
- leave reviews for the books.

## Main goals
1. Deliver the three core features.
2. Try to adhear to as many good practices as possible.
3. Maintain automated regression tests.
4. Automate testing and delivery.

## Nice to have
- Proper authentication;
- test environment;
- automated code standards with linters;
- being super LEAN.

## Architechture
In the beginning use Google Sheet and its API for persistnce; make sure to keep the logic around this layer as tin as possible.<br>
Critically evaluate what level of OOP is needed. I would try with vanilla JS at the beinning.
*Do we need a standalone server between the client and the Google Sheet or we can just put all the logic in a Google Action?*
*Can we use one repo for both the frontend and the backend? Are the GitHub worflow concers that limitting?*

Anguler apps can be deployed to GitHub's page feature: https://v17.angular.io/guide/deployment.

GitHub action can be used to run unit tests and deploy changes in the app.
