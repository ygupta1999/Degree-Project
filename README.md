# Helius V1.1

## Basics Doucmentation
- https://docs.djangoproject.com/en/3.1/intro/tutorial01/
- https://angular.io/start/start-deployment

## Setup Enviorment
This code is run from independent workspaces from terminals inside VScode at the top level
### Install and run Agular
- npm install -g @angular/cli
- ng add @angular/fire
- ng serve

### Install and run Django
- python -m pip install Django
- python manage.py runserver

## Testing
- If you go to django site and add /admin, you can add movies which will be reflected in the homepage of Helius
- You can login with the preset email and pass to demo functionality
- If you have anyther instances or django or angular running, you will have to add permissions to the port numbers in django

## ToDo
- add firebase database connections so each user willl have fields like name and address one they login
- attempted to add the movie thing to a sections of once the user logins but not done yet

