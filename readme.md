## On Dev:
See (REACT_APP_API_URL) the API_ENDPOINT here: /src/Constants.js

```sh
mv .env.sample .env
```

## Work Process

- Work on dev branch (Test in Dev)
- Merge dev to staging (Push to Deploy, Test in Staging Environment)
- Merge Staging to Master (Push to Deploy, Hopefuly we don't annoy our users)

### Working on new Feature
    - Checkout from dev branch with name e.g feature-{TaskName}
    - Submit a Merge Request into upstream's dev branch on gitlab
    
## Todo
- AutoDeploy to ELB
- Better UI for the header

## URLs
- https://staging.dashboard.pushdeploy.io
- https://dashboard.pushdeploy.io