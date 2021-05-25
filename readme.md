## Deployment (AppCenter)
- To deploy a new release first ask Peermont to add you to the AppCenter projects.
- Then run the following to commands to deploy Android and iOS separately.
    - `appcenter codepush release-react -a Keaton.roux/Winners-Circle-App-Android -d Production -t 1.0.x -m`
    - `appcenter codepush release-react -a Keaton.roux/Winners-Circle-App-iOS -d Production -t 1.0.x -m`
    - <strong>-a</strong> - selects the project
    - <strong>-d</strong> - is to set the deployment target
    - <strong>-t</strong> - is to set the app version it needs to deploy to, this will match  the appstores current version (e.g. 1.4.x)
    - <strong>-m</strong> - is to set a mandatory download, this will make the app force update to this latest version
- To get the codepush keys run:
    - `appcenter codepush deployment list -a <ownerName>/<appName> --displayKeys`
    
### References
[Markdown Syntax](https://www.markdownguide.org/basic-syntax#horizontal-rules)
