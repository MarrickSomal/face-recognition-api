# FaceRecognition-api

1. Clone this repo
2. Make sure you have docker installed and running on your computer
3. Run `docker-compose up` ( you may have to run `docker-compose up --build` for the first setup phase)
4. You must add your own API key in the `controllers/image.js` file to connect to the Clarifai API.
5. You will also need to update Line 21 in server.js to your client app port (i.e. 3001)

**Important:** if you are getting conflict erros, you should run `docker stop <container name>` that is already running in the background.
**Important:** if you are getting other errors, you should run `docker-compose down` to bring everything down, and start over.

To access backend's bash:
Run `docker-compose exec face-recognition-api bash`

To access postgres: (adjust PORT number if needed)
Run  `psql postgres://<username>:<password>@localhost:5432/face-recognition`

To access redis:
Run `docker-compose exec redis redis-cli`

You can grab Clarifai API key [here](https://www.clarifai.com/)

** Make sure you use postgreSQL instead of mySQL for this code base.