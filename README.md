# Single Page Apps with Phoenix

I created this application for a talk at Elixir London about swapping Phoenix's default asset bundler Bunch for Webpack. It uses Webpack Dev Server for development configured to provide Hot Module Replacement.

The slides themselves are a Single Page Application written in React and help demonstrate the problem of losing state in between page loads which is a problem you'll find if you use Brunch. The current slide number is kept as part of the state of the application, a page reload will reset the state and take you to the first page. In this example with Webpack Dev Server, you can modify the JS or CSS and just the modified components will be hot replaced without a page relaod and without losing the app state.

The main difference is that when you use the Webpack Dev Server, your assets are not compiled and written to the filesystem each time you change them. 

When you use Brunch, each time you modify your JS or CSS files, they get compiled and written into `priv/static/`, Phoenix code live-reload will then detect a change in those files and trigger a page reload. With the Webpack Dev Server, your assets are served dynamically from the dev server itself, not Phoenix. When you're done with your development, you'll bundle and write them to the filesystem for production using a separate command.

## Getting started

```
$ npm install
$ mix deps.get
$ mix phoenix.server
```

Point your browser to `http://localhost:4000`

## Presentation mode

By default you'll be in spectator mode.

To change between slides, in your browser console set:

```
window.localStorage.setItem('token', 'elixirlondon')
```

Then you can open a separate incognito window to watch the slideshow. If you want to connect from a different device you'll need to find and replace all those `localhost:8080` for `<your_ip:8080>`.

Use our right and left arrows to change slides.

Now you can modify the JS or CSS files and watch it update in realtime without losing the state of the Slideshow.

## How it all works

The slides are a React app contained in `web/static/js/app.js`

There's a View Helper for the layout in `web/views/layout_view.ex`. This helper is used in the layout template and will inject a script pointing to the Webpack Dev Server in development or a static file in production.

The slides are broadcasted to everyone connected using `web/channel/room_channel.ex` (`slide` handler)

The Webpack configuration files are `webpack.config.js` and `webpack.config.prod.js` for production. The Babel JS transpiler configuration lives in `.babelrc`.

## Bundling

If you want to get the actual JS and CSS bundles run: 

```
$ webpack --config webpack.config.prod.js -p
```

## Author

Mauro Pompilio for Elixir London.
