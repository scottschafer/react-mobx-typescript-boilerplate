# Frontend Boilerplate with React, MobX & TypeScript
Another react-mobx-webpack-typescript boilerplate, designed for scale.

## Motivations / Design Goals
- Provide a scalable framework for building medium to large frontend applications
- Should work well out of the box
- Isolate business logic in data stores
- Enforce strict mode at compile time

## Application Structure
This boilerplate separates the application into various buckets:
- ``apis``
This defines external APIs that the frontend code can call. There is a single ``APIs`` object that contains interfaces to API implementations.
- ``models``
Simple data definitions. Should typically have observable properties.
- ``stores``
MobX data stores. All stores in the application are instantiated in ``RootStore``, and they all have a reference to the ``RootStore`` object, which
in turn has a reference to the APIs object. Stores should inherit from BaseStore. Since MobX strict mode is turned on after all stores are
created, it is legal to auto-initialize observable properties. Once all stores are created, each of their init() methods will be called.
- ``routes``
This is a nested folder of containers, stores and components. Larger applications benefit from a more functional structure, and since small
projects have a tendency to turn into large ones, it seems prudent to start with a functional approach. Since functional modules and routes
tend to break along the same lines, it seems simpler to use routes as our functional structure.

Uppercase subfolders represent child routes. For example, ``Home/Widgets/Editor`` maps to the route ``/widgets/editor``. Lowercase subfolders may include
``components`` and ``stores``.

## Coding Patterns
- Containers should be lightweight, primarily connnecting components with store properties and instantiating the UI structure.
- Business logic should live in stores, including responding to changes to the current route.
- Actions that modify store data should be in the respective stores.
- APIs should be called by stores, typically from within actions.
- To prevent runtime violations of strict mode, `@observable` properties should be readonly. The readonly flag can be overridden through the
`MakeWriteable` generic and `asWriteable` getter as shown in this example.

```
class ExampleStore extends BaseStore {
  @observable readonly prop1: string = ''; // note: can auto-initialize @observable here

  @action setProp1(value: string) {
    this.asWriteable.value = value;
  }

  // internal cast to writeable object
  private get asWriteable(): MakeWritable<ExampleStore> {
    return (this as MakeWritable<ExampleStore>);
  }
}

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 3.2
- [x] [React](https://facebook.github.io/react/) 16.7
- [x] [React Router](https://github.com/ReactTraining/react-router) 4
- [x] [Mobx](https://github.com/mobxjs/mobx) 5
- [x] [Mobx React](https://github.com/mobxjs/mobx-react)
- [x] [Mobx React Router](https://github.com/alisd23/mobx-react-router/)
- [x] [Mobx React Devtools](https://github.com/mobxjs/mobx-react-devtools)

### Build tools

- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [PostCSS Preset Env](https://preset-env.cssdb.org/)
  - [x] [CSS modules](https://github.com/css-modules/)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)


## Setup

```
$ npm install
```

## Running

```
$ npm start
```

## Build

```
$ npm run build
```

## Code Format

```
$ npm run prettier
```

# License

MIT
