# What is it?
Project to manage book suggestions with React, Next, Firebase and Google Books API. It uses Vercel for deployments.

# Demo
https://books-bmehta.vercel.app/

# Local setup
- git clone the repo
- Run `npm i -g vercel`
- Run `vercel env pull`. This will create a .env file on your local with variables that get exposed with process.env.
- `npm run build`
- `npm run dev`
- When a github push happens, it fires off a deployment process within Vercel, the app can be then accessed at the demo url above
