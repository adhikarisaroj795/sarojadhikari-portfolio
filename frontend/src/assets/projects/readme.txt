   sudo apt install webp        # once
   cwebp -q 82 screenshot.png -o src/assets/projects/new-project.webp

   for converting to webp for adding more project

   Add one entry in src/data/projects.js: an import line plus an object in FEATURED or MORE_WORK, copying the shape of an existing one.




cd ~/portfolio/frontend && npm ci && RAYON_NUM_THREADS=2 UV_THREADPOOL_SIZE=2 npm run build && cp -r dist/. ~/sarojadhikari.info.np/