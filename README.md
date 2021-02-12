# Virtual Showcase Experience

## Git LFS
This repository requires [Git LFS](https://git-lfs.github.com) to be installed.

## Running and Building

First get all the dependencies by running
`npm install`

Then you can run the dev server with
`npm run dev`

For a production build, which outputs to `dist/`, run
`npm run build`

Because we are using in-development versions of Parcel and Vue, sometimes it might hang up or refuse to output the render function for SFC, in which case stop the dev server and remove the cache folder before restarting it:
`rm -r .parcel-cache`
