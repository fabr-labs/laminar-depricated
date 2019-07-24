Installation: 
```
# yarn add coach-logic/laminar#laminar-v<latest-version>-gitpkg
yarn add coach-logic/laminar#laminar-v1.1.4-gitpkg
```

Cutting a release:
```
npm version major|minor|patch
```
*On cutting a new release, `gitpkg` automatically generates an installable package and uploads it to a git tag with the `laminar-v<latest-version>-gitpkg` format* 