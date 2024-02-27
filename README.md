### https://paulohenrique64.github.io/amazon-web-scraping/
### https://amazon-web-scraping.azurewebsites.net/

![1](https://github.com/paulohenrique64/web-scraping-amazon-search/blob/main/screenshot.png)

# Web scraping amazon search

## Requirements to run the project

### Environment setup:

- node v12.22.9 
- npm v8.5.1

### How to run it on my machine?

- Clone the project `https://github.com/paulohenrique64/web-scraping-amazon-search`
- Acess `/node-backend` directory
- Run `npm install`
- Run `npm run dev`
- Back to `root` of project
- Open `/frontend/index.html` file in your browser
- Ready 🎉

### Project structure

- `/frontend/index.html`: Project home page.
- `./node-backend/app.js`: Server home page, created using expressjs framework.
- `./node-backend/src/routes/routes.js`: All server endpoints are declared in this file, in order to keep the project organized.
- `./node-backend/src/controller`: It is in this folder that the controllers are located, that is, the functions that are executed after a client accesses a certain server route.

### Endpoints

- `/api/scrape/:keyword`: GET endpoint, receives a keyword using url parameters, and returns all products found on the first page of amazon with this keyword.




