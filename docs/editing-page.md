# Editing a Page

We use markdown files for our page content. These files are stored in GitHub. The GitHub UI workflow can be used to edit page content, with the steps shown below. Note that you will need a GitHub account and write access to the repository where you wish to make changes. For access, you can post in the #github Slack channel or reach out to your manager.

To edit a page:
1. At the bottom of each page in the Daylight site is text stating "Suggest an edit for this page" where "edit" is a link to the edit workflow. Click edit.
2. Edit will take you to a page that looks like the one below. Make the changes that you would like to make. You can then select the "Preview" tab near the top to preview your changes.
![Button edit page](./screenshots/edit-page.png?raw=true)
3. Once your changes look good, the commit workflow will appear on either the right side or at the bottom under the editor. You likely will be able to leave everything as is (just make sure that "Create a new branch for this commit and start a pull request." is the selected radio button). Click "Commit Changes".
![Button commit workflow](./screenshots/commit-changes.png?raw=true)
4. The "Open a pull request" screen will open. You can review your changes, add a comment, then click "Create pull request". You can also add specific reviewers under "Reviewers" on the right side, otherwise reviewers will be added by default.
![Open pull request](./screenshots/open-pr.png?raw=true)
5. The pull request will be reviewed then approved. A member of Gaudi will be put on the pull request and can do the merging process if you would prefer.
6. After approval, to merge click the green "Merge pull request" button (but don't click "Confirm merge" on the next screen just yet!)
![Merge pull request](./screenshots/merge-pr.png?raw=true)
7. Add the "fix:" prefix to your commit message, then click green "Confirm merge" button.
![Confirm merge](./screenshots/confirm-merge.png?raw=true)

At this point it can take varying amounts of time for the changes to appear in the Daylight site. If the change is to a page within the `documentation` repository, then it should appear within 5 - 10 minutes. If the change is to a component repository, then it would be picked up the next time a deployment occurs, which will soon be nightly and eventually likely on demand as well.
