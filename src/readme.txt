1) Remove configureFirebase from gitignore before pushing it to Heroku.
2) procfile contains the path of a file to execute after build.
3) if you have any step to perform (like a build step) then specify that in the build command in npm.
4) print stats in case the server/Client build fails.
