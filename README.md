# The Price is Right
# Javier Torres, Deshawn Dana, Robert Merino, Stephan Jones, Trang Nguyen
# Project 2: Trivia Game using MongoDB, Express, Node.js, Socket.io and Knockout

=========================   Requirements to Run   ================================

Node.js
Mongodb
Express
Socket.io
Knockout

=========================    Instructions     ====================================

1. clone repository
2. Goto CPSC473Project2 folder
3. open command prompt and type the follow commands
4. If Package.json not working, run the following commands <br />
	a. npm install —-save mongodb <br />
	b. npm install —-save express <br />
	c. npm install —-save mongodb <br />
	d. npm install —-save socket.io <br />

========================  To Run TPIR  =======================================

   MUST FOLLOW IN ORDER!

1. Open 3 command console windows
2. On Command console window1, type mongod and press enter
3. On Command console window2, type node server.js and press enter
4. On Command console window3, type mongo and press enter 
5. In mongo shell (window3), type: show dbs
6. type: use pricesDB (to ensure db has loaded the images)
7. click on index.html and enjoy!

=========================   Notes/Comments   ==================================

* Minimum of 5 players with a maximum of 3 rounds per 5 players, any excess players
  will be pooled as a spectator (limited view)
* imagesForDB contains Images needed for the game
* images are named with the format imagename$price.jpg to allow database to parse
  images name contents and add to database
* Winners Circle (final round not implemented)





