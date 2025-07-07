# Recipe Maker
Welcome to Recipe Maker—a social media application that brings food lovers together to share, inspire, and explore the world of recipes.

## Features:
1. Post a Recipe: Users can create and share their own recipes with others.
2. Engage with Recipes: Like and comment a recipes posted by others.
3. Mark Favorites: Save recipes to your favorites for easy access.

### Future Scope
Integrate AI feature, where users can input available ingredients, and the application generates possible recipes in real-time.

## ERD:
![ERD](https://github.com/rohitadittya/Recipe-Maker-Social-Media/blob/main/client/public/assets/images/ERD_Recipe_Maker.png)

## Relations:
![image](https://github.com/rohitadittya/Recipe-Maker-Social-Media/blob/main/client/public/assets/images/Recipe_Maker_Relation_diagram.png)

## To run the application:
1. npm i
2. add the following in .env file
   1. dbURL - Mongo DB Atlas URL
   2. JWT_SECRET - A Secret for JWT
3. npm run dev

## You can find the postman collection [here](https://github.com/rohitadittya/Recipe-Maker-Social-Media/tree/main/server/postman-collections)
Import the [collection](https://github.com/rohitadittya/Recipe-Maker-Social-Media/blob/main/server/postman-collections/SUNY%20Recipe%20Maker%20Appln.postman_collection.json) and the [environment_variables](https://github.com/rohitadittya/Recipe-Maker-Social-Media/blob/main/server/postman-collections/recipe_app_local.postman_environment.json).