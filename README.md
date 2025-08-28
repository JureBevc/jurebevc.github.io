Dev server:
```
hugo server
```

Push to prod:
```
hugo --gc --minify --baseURL "https://jurebevc.com/"

git commit
git push

ssh root@161.35.94.146
cd /var/www/jurebevc.github.io/
git fetch
git reset --hard origin/main
```