let mix = require("laravel-mix");

mix
  .js("assets/scripts/app.js", "js")
  .sass("assets/styles/app.scss", "css")
  .setPublicPath("public");
