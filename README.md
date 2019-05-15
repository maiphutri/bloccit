# Bloccit

Bloccit is a CRUD web application built with NODEJS that allows users to create posts under topics, then comment and vote on those posts, plus save their favorite posts. Check it out at [Bloccit-heroku](https://maiphutri-bloccit.herokuapp.com)

### Built with
* [Bootstrap](https://getbootstrap.com)
* [EJS](https://github.com/mde/ejs)
* [ORM-Sequelize](https://github.com/sequelize/sequelize)
* [Database-PostgreSQL](https://github.com/brianc/node-postgres)
* [NodeJS](https://nodejs.org/en)
* [ExpressJS](https://expressjs.com)
* [TDD-Jasmine](https://github.com/jasmine/jasmine)

### Signing up, signing in, signing out
Everything on Bloccit can be read publicly, but to create posts, vote on posts, write comments and save favorite posts, users must create an account with an email and password. Bloccit uses the [Passport](http://www.passportjs.org) to handle user authentication. When users sign up, they'll choose a email and password. User's password will be hashed using [bcrypt](https://github.com/dcodeIO/bcrypt.js) and stored in database. Once signed up and log in, users will have full access to their own post.

### Posting
Users can create posts by selecting a topic and clicking the "New Post" button on the topic's page. The post will then appear in the list of posts under the topic, complete with voting, the number of comments and the author. If a user chooses to do so, they can delete a post they created by clicking the "Delete Post" button inside the post.

### Commenting
When a post is open, users can comment by typing a message in the comment bar and clicking the "Submit Comment" button. New comments will appear below previous comments. Each comment can be directly linked and referenced by clicking the small text that says "Link" and copying the resulting URL. A user can also delete a their own comment by clicking the small text that says "Delete".

### Voting
Votes help capture the reputation of a post. Users can either upvote a post by clicking the up arrow or downvote a post by clicking the down arrow, resulting in a number that represents the overall number of upvotes minus the number of downvotes. For example, if five users upvote the post and two users downvote the post, the overall number that will be presented is "3". A user can only vote once on each post.

### Favoriting
Users have the option of saving their favorite posts by clicking the "Favorite" button. Doing so will save the post to the user's list of favorites as well as send the user a notification each time the post receives a new comment. Alternatively, if a user no longer wants to save a post, they can click the "Unfavorite" button.

### User profiles
All of a user's activity is saved on their user profile. Each profile holds three lists: posts, comments and favorites posts.
___
This project was built for Bloc's Web Development Program.
