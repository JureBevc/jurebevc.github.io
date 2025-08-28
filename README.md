Dev server:
```
hugo server
```

Push to prod:
```
hugo --gc --minify --baseURL "https://jurebevc.com/"

git commit
git push
```