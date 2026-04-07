## Cutting a new release

<details>

_Note: these instructions are for maintainers_

1. Update the version number in [package.json](https://github.com/cloudpermit/lein-dependency-submission-action/blob/main/package.json) and run `npm i` to update the lockfile. This is also a good time to make sure that the `dist/index.js` file is up to date by running `npm run build`.
2. Go to [Draft a new
   release](https://github.com/advanced-security/maven-dependency-submission-action/releases/new)
   in the Releases page.

<img width="481" alt="Screenshot 2022-06-15 at 12 08 19" src="https://user-images.githubusercontent.com/2161/173822484-4b60d8b4-c674-4bff-b5ff-b0c4a3650ab7.png">

3. Click "Choose a tag" and then "Create new tag", where the tag name
   will be your version prefixed by a `v` (e.g. `v4.1.2`).
4. Use a version number for the release title (e.g. "4.1.2").

<img width="700" alt="Screenshot 2022-06-15 at 12 08 36" src="https://user-images.githubusercontent.com/2161/173822548-33ab3432-d679-4dc1-adf8-b50fdaf47de3.png">

5. Build the release executables by manually triggering publish executables action. The output of this action will be a zip file that you should download, extract, and drag into the binaries section. There should be three files there: ending in `-linux`, `-macos`, and `-win.exe`.
6. Click "Publish Release".

You now have a tag and release using the semver version you used
above. The last remaining thing to do is to move the dynamic version
identifier to match the current SHA. This allows users to adopt a
major version number (e.g. `v1`) in their workflows while
automatically getting all the
minor/patch updates.

To do this just checkout `main`, force-create a new annotated tag, and push it:

```
git tag -fa v5 -m "Updating v5 to 5.0.0"
git push origin v5 --force
```
</details>
