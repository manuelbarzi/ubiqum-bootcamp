// Shows commits
git log

// Shows any changes which you didn't commit (except the ones influenced by .gitignore)
git status

// You will be in remote branch
git pull origin [branch]

// This will connect you to remote git repository
git remote add origin [git address]

// Check if you are connected to a remote repository
git remote -v

// Change branch
git checkout [branch]

// Create and checkout a branch
git checkout -b [branch]

// Create a REPOSITORY
git init

// Create a folder
mkdir [folder]

// Create a file
touch [file]

// Adding all changes to staging area
git add .

// Commit all changes to actuall branch
git commit -m "[message]"

// Clone remote repository from GitHub to your actuall Repository
git clone [git address]

// Push back to GitHub repository 
git push -u [Remote repository name(origin/master usually)]

// Shows how much branches you have and also the one your actually using
git branch

// Create a branch
git branch [branch]

// The branch in which you actually are will be merged with branch you will put inside of git merge [branch]
git merge [branch]

