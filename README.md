## Deploying a Single Page React App On ZEIT.co

We will be going over how to use ZEIT.it to deploy our applications.  ZEIT is a hosting service that provides us with a command line interface (cli) that we will use to manage our deployments.  Much like we use git to manage our repository histroy.

## Globablly Install ZEIT's deployment CLI called now

`npm i -g now`

## Login to ZEIT

`now login`  

It'll ask for your email.  Then send a verification email to the address provided.  This will also create an account if you don't have one.

### Make sure your server is setup to run off the build process

Before we want to deploy our project, we should make sure that our project is working on our local machine.  If it's not working, open you dev console, look at your terminal output.  And try to figure out what is causing it to break locally.

Up till now we have been using the React Dev Server to serve our react app.  We are going to update this so that it will use a production build of our project.  This will do things such as removing extra white-space, comments, and minify our code so that it's as fast to download as possible.  

Tell create-react-app to use webpack to create a build folder with your latest code.

`npm run build`

Make sure your dev server isn't running for the front end.  Start your backend server

`nodemon`

In your browser, check that you can go to http://localhost:3030 (or whichever port you told your backend to run on.) And make sure that you are sending the files to the front end.


Make sure your express.static is pointing to the build folder.

```
app.use( express.static( `${__dirname}/../build` ) );
```

If you are using browser history, you'll need this to make sure your index.html file is being given on the other routes.

Towards the *end* of your server file make sure you have this (this needs to run after you've setup all your other endpoints)

```
const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '..','build','index.html'));
})
```
Check that your project is working.

If it is not.  Check your DevTools console, as well as the server terminal output to figure out what is going wrong.  

## Ensure you've setup a .env file, and set node to use it for your project.

All the configuration that you need different between deployed and local should go into this file.  As well as any keys that you want to be secret.  

The connection string to your database, the REACT_APP_ reference for Auth0, as well as your Auth0 credentials should be in here.  You may have additional variables set here if you want to make other changes between a local and production build.  

*Make sure the .gitignore contains the .env and .env.prod files*

Example .env file

```
REACT_APP_LOGIN="http://localhost:3030/api/auth/login"
REACT_APP_LOGOUT="http://localhost:3030/api/auth/logout"

DOMAIN="brack.auth0.com"
ID="46NxlCzM0XDE7T2upOn2jlgvoS"
SECRET="0xbTbFK2y3DIMp2TdOgK1MKQ2vH2WRg2rv6jVrMhSX0T39e5_Kd4lmsFz"
CONNECTION_STRING="postgres://vuigx:k8Io23cePdUorndJAB2ijk_u0r4@stampy.db.elephantsql.com:5432/vuigx"
NODE_ENV=development
```

Copy your `.env` file and rename it `.env.prod` Change any values that you need to change (The REACT_APP_LOGIN info will certainly need to change, depending on your project you may or may not want to change the DB, and if you've used something with stripe that needs a real key outside of development then that would change as well.)

Example .env.prod
```
REACT_APP_LOGIN="/api/auth/login"
REACT_APP_LOGOUT="/api/auth/logout"

DOMAIN="brack.auth0.com"
ID="7yq4hbufvtq32uirf7v4w"
SECRET="aszxvuigvagsfbawroyzx8gvaiger8xtv87gsfxzv"
CONNECTION_STRING="postgres://sdfsdrtfg:98yhuisdfiybriuhfg@stampy.db.elephantsql.com:5432/sdfsdrtfg"
NODE_ENV=production
```

Then we are going to check out main server file.
It should contain the following at the beginning of your code (It can go anywhere before you first try to use the process.env variables, but the first line makes sure that it is always available to you);

`require('dotenv').config();`

If you did not have this already in your project, you will need to install dotenv.

`npm i dotenv`

Double check that your server is still working with this new configuration setting.



# Modify our package.json

### Creating the Scripts Now Needs to run
Under the scripts section, we want to add a new script called now-start, this script is going to tell ZEIT what file it should start for the backend.  In this case `node server/index.js` though `node server/server.js` may be how your project is setup.

We are also going to add a "deploy" script where we will configure our deployment.

`now --public --dotenv=.env.prod -d`

now ---- This is the ZEIT's command to make a deployment.

 --public ---- This is to acknowledge we are making a public deployment so the source code and logs are publicly available.

 --dotenv=.env.prod ---- This is telling our deployment what configuration we want to use for our environment variables.

 -d This is telling it to use debug mode.  You'll get better error messages in your logs.  After your deployment is working properly you may choose to disable this.

### Add an alias for our deployment to use.

Now lets us set up an alias for our deployments.  This will be the domain that we can give out to people.  On the free tier you will be subdomained to .now.sh  

In the package.json we are going to add a new property called "now" and set it to an object with an "alias" property that we want to be our subdomian.  In this example "bracks-bot-friends"

The bottom of our package.json should look more or else like this.
```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject",
  "now-start": "node server/index.js",
  "deploy": "now --public --dotenv=.env.prod -d"
},
"now":{
  "alias":"bracks-bot-friends"
},
"proxy":"http://localhost:3030"
```

## Try the deployment

We should now be able to do `npm run deploy`.  And it will upload our project to ZEIT, set up a server.  ZEIT will tell you the random address that they currently have pointing to the new server.  (This process can take quite a while)

If we run `now alias` it will apply the alias we setup in our package.json.

## Making changes

ZEIT does not let you edit a server once it is created.  So how do we make changes to our project?  Well, make the desired changes to your code.  Run `npm run deploy`.  After it's created the server, go to the address that they've provided, make sure that it is working as you expect, then run `now alias` It will change where your server is pointing.  So all new traffic will go to the new server.
