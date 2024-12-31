# Clasp usage

⚠️ **IMPORTANT** The order in which the scripts are pushed to the Google Editor is very important. See: [filepushorder](https://github.com/google/clasp?tab=readme-ov-file#filepushorder-optional).<br>
In that regard the all directories are prefixed with 0 so they naturally come before everything else, since we can't wildcard all files in a directory.

ℹ️ Interfaces don't generate models (or any source) in .gs. There's no need to prioritize them. Enums, however, do.<br>
ℹ️ Exporting methods get's them wrapped in an object named as the file. Then GS doesn't know where the wrapping objects come from. This leads to duplication of simple utility methods like the one that turns Sha264 signatures in strings.

Read more about Clasp's usage on the [official documentation](https://github.com/google/clasp)

**Before starting to work make sure you're logged-in**
```sh
npx clasp login
```

**If you want to pull latest remote scripts use:**
```sh
npx clasp pull
```

**Push changes to Google:**
```sh
npx clash push
```
