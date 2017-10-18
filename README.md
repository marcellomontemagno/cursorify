[![CircleCI](https://circleci.com/gh/marcellomontemagno/cursorify.svg?style=shield)](https://circleci.com/gh/marcellomontemagno/cursorify)

## What is it about?

It helps to manipulate, complex and deeply nested objects trees.

## How does it work?

Assume you need to create an object tree like the following:

```javascript
const obj = {
  a: {
    b: {
      c: [
        {d: 1},
        {
          e: {
            f: {g: 2},
            h: {i: 3}
          },
        },
        {l: 4}
      ]
    }
  }
}
```

Now assume you have to delete the object `{l: 4}`, delete the key `h` and override `{g: 2}` with `{k: 2}`.

With cursorify you can create cursors to the parts of the object you will need to modify later:

```javascript
import {createCursors} from 'cursorify';

const cursors = createCursors();

const obj = {
  a: {
    b: {
      c: [
        {d: 1},
        {
          e: {
            f: cursors.push('cursor1',
              {g: 2}
            ),
            h: cursors.push('cursor2',
              {i: 3}
            )
          },
        },
        cursors.push('cursor3',
          {l: 4}
        )
      ]
    }
  }
}
```

And then use the cursors to easily mutate the object as you intended to:

```javascript
import {setByCursor, deleteByCursor} from 'cursorify';

deleteByCursor(obj, cursors['cursor3']);

deleteByCursor(obj, cursors['cursor2']);

setByCursors(obj, cursors['cursor1'], {k:2});

/*

  Now obj value is:

  const obj = {
    a: {
      b: {
        c: [
          {d: 1},
          {
            e: {
              f: {k: 2}
            },
          }
        ]
      }
    }
  }

*/
```

## API

```javascript
import {createCursors, getByCursor, setByCursor, deleteByCursor} from 'cursorify';
```

- createCursors() initializes a new empty list of cursors
- cursors.push(name, value) pushes a new cursor to the list
- getByCursor(obj, cursor) retrieve a value from `obj` using the cursor `cursor`
- setByCursor(obj, cursor, newValue) overrides a value in `obj` using the cursor `cursor`
- deleteByCursor(obj, cursor) deletes a value in `obj` using the cursor `cursor`
    - if the cursor points to an entry into an array deleteByCursor removes that entry from the array
    - if the cursor points to a value into an object deleteByCursor removes the related key from the object

## When is this library useful? (A real use case)

Sometimes object trees are structure in a way that is very difficult to modify or get values form them later on.

A real life example is the webpack configuration object tree, modify, or delete a loader from the configuration after its initialization can be very messy and unreliable.

In general overriding a pre existing webpack configuration can be very painful.

Here an example of how a webpack configuration object looks like:

```javascript
let config = {
  output: {
    path: BUILD,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new DefinePlugin(ENV),
    new ProgressBarPlugin({clear: false})
  ],
  resolve: {
    modules: [NODE_MODULES, CWD_NODE_MODULES],
    extensions: ['.js', '.jsx', '.json']
  },
  resolveLoader: {
    modules: [NODE_MODULES, CWD_NODE_MODULES]
  },
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          enforce: "pre",
          use: [
            {loader: 'source-map-loader'}
          ]
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.s?css$/, // alternative *** : ^(?:(?:[^\.\s]+\.)(?!module))+s?css$
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ]
      },
      {
        test: /\.jsx?$/,
        include: [SRC, TESTS],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['babel-preset-es2015',{ "modules": false }], //{ "modules": false } is needed to make react-hot-loader work
                'babel-preset-flow',
                'babel-preset-stage-0',
                'babel-preset-react'
              ],
              plugins: [
                'react-hot-loader/babel'
              ]
            }
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }
    ]
  }
};
```

What if you only need to modify the loader for the svg files after the config object has been created? There is no reliable and easy way for you to mutate only that part of the config object.

With cursorify you can name parts of this configuration object so that it will be very easy for you to modify them later on:

```javascript
import {createCursors} from 'cursorify';

const cursors = createCursors();

let config = {
   output: {
     path: BUILD,
     filename: 'bundle.js',
     publicPath: '/'
   },
   plugins: [
     new DefinePlugin(ENV),
     new ProgressBarPlugin({clear: false})
   ],
   resolve: {
     modules: [NODE_MODULES, CWD_NODE_MODULES],
     extensions: ['.js', '.jsx', '.json']
   },
   resolveLoader: {
     modules: [NODE_MODULES, CWD_NODE_MODULES]
   },
   module: {
     rules: [
       cursors.push('source-map-loader',{
           test: /\.jsx?$/,
           enforce: "pre",
           use: [
             {loader: 'source-map-loader'}
           ]
       }),
       cursors.push('html-loader',{
         test: /\.html$/,
         loader: 'file-loader',
         options: {
           name: '[name].[ext]'
         }
       }),
       cursors.push('style-loader',{
         test: /\.s?css$/, // alternative *** : ^(?:(?:[^\.\s]+\.)(?!module))+s?css$
         use: [
           {loader: 'style-loader'},
           {loader: 'css-loader'},
           {loader: 'sass-loader'},
         ]
       }),
       cursors.push('javascript-loader',{
         test: /\.jsx?$/,
         include: [SRC, TESTS],
         exclude: /(node_modules|bower_components)/,
         use: [
           {
             loader: 'babel-loader',
             options: {
               babelrc: false,
               presets: [
                 ['babel-preset-es2015',{ "modules": false }], //{ "modules": false } is needed to make react-hot-loader work
                 'babel-preset-flow',
                 'babel-preset-stage-0',
                 'babel-preset-react'
               ],
               plugins: [
                 'react-hot-loader/babel'
               ]
             }
           },
         ],
       }),
       cursors.push('svg-loader',{
         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url-loader',
         options: {
           limit: '10000',
           mimetype: 'image/svg+xml'
         }
       }),
       cursors.push('eot-loader',{
         test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'file-loader'
       })
     ]
   }
 };
 ```

creating cursors doesn't mutate the original object so that you can keep on using it as usual, the advantage is that changing the loaders now is very simple e.g:

```javascript
//the following code replaces the existing loader for the svg files completely:

import {setByCursor} from 'cursorify';

setByCursor(config, cursors['svg-loader'], {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  loaders: [
    'svg-inline-loader', {
      loader: 'image-webpack-loader',
      options: {
        svgo: {
          plugins: [
            {
              removeStyleElement: true
            },
            {
              removeXMLNS: true
            },
            {
              removeDimensions: true
            }
          ]
        }
      }
    }
  ]
});
```

consider providing references to part of your configuration object using cursorify if you are building a tool exposing a complex and deeply nested configuration object.
