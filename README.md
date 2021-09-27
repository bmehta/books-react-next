# books-react-next
Project to manage books with React, Next, Firestore/Firebase and Google Books API

# Demo
https://books-bmehta.vercel.app/

# Local SETUP
- git clone the repo
- Run `npm i -g vercel`
- Run `vercel env pull`. 
- This will create a .env file on your local with variables that get exposed with process.env
- Run `npm run build`
- Run `'npm run dev`
- When a github push happens, it fires off a deployment process within Vercel, the app can be then accessed at the demo url above
