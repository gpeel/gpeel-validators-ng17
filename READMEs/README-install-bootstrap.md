# install bootstrap

https://ng-bootstrap.github.io/#/getting-started

Why ng-bootstrap?

- https://stackoverflow.com/questions/44965850/what-is-the-difference-between-bootstrap-and-ng-bootstrap
-

you don't necessarily need to use ngx-bootstrap or ng-bootstrap in your Angular project. Adding the core Bootstrap CSS
and JavaScript files is sufficient to use Bootstrap in your application.

However, using ngx-bootstrap or ng-bootstrap can provide some additional benefits:

Angular-specific Components: These libraries offer Angular-specific implementations of Bootstrap components, which can
simplify their integration into your Angular application. They provide Angular directives and services to make working
with Bootstrap components more seamless.

Dependencies: ngx-bootstrap has a dependency on jQuery and it requires the Bootstrap CSS and JavaScript files to be
manually added. On the other hand, ng-bootstrap is built entirely in Angular, so it does not have any external
dependencies.

## with ng add

        ng add @ng-bootstrap/ng-bootstrap

## font awesome

        ng add @fortawesome/angular-fontawesome

https://github.com/FortAwesome/angular-fontawesome

o install Font Awesome in an Angular project, you can follow these steps:

        npm install --save @fortawesome/fontawesome-free

In the "styles" section, add the Font Awesome CSS file path to include the styles. The path should be relative to your
node_modules directory. For example:

        "styles": [
        "src/styles.css",
        "node_modules/@fortawesome/fontawesome-free/css/all.min.css"

]
