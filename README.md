# Labyrinth

This project is still under development.  View the last version [here](https://pacific-stream-64157.herokuapp.com/).

## About

Labyrinth is a puzzle game, that can be surprisingly complex.  This repo contains the end result with over 1000 saved labyrinth puzzles which have been created over several weeks spare time.

A genetic algorithm was used to create the mazes.  Each generation had a population of 100 mazes, which were randomly mutated or combined, then solved and graded by difficulty.  Mazes with a higher difficulty were more likely to survive and pass on to the next generation.  This process was repeated until it showed no improvements, roughly 3000 times.  The top 10% of the mazes are included in the 'database' for the website.

One question of interest is how you write a computer program to assign a difficulty score to each maze.  What I ended up using, and seemed to work pretty well, is a function of the solution length (total number of moves in the solution path), solution positions (number of equivalent classes of positions in the solution path), and the total number of positions that you can reach in the maze.

# Future

Some of the things I hope to improve, give time:

* Each maze should have it's own url.  I plan to switch the project over to react router and make the website REST-ful
* Put the maze generator online, so others can have fun creating mazes.   Implement a service worker to run the genetic algorithm while the graphics are handled on the main site.
* Improve aesthetics
* Make the mazes playable on mobile devices