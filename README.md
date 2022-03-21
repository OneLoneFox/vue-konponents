# Konponents

## Project setup
```
yarn install
```

### Runs docs in development mode
```
yarn run docs:dev
```

### Compiles for production
```
yarn run build
```

## Features

### Great documentation

Every aspec, prop, event and public method of every component is documented, down to the css vars they use.

### Modern design

If you're as tired as me of bootstrap-like dated design then this is your component library.

Rounded borders? Yes sir.

Smooth subtle shadows? Absolutely.

Microinteractions? Of course, why are they so rare?

### Beautiful, performant and polished animations

I waste days at a time to polish a single animation to look right (aka. I hate squishing/stretching content with scale just for performance's sake), 
not only that but I try my hardest to optimize them as much as possible by avoiding unnecesary layout re-flows (with some exceptions).

### Focused on functionality

a.

### Accesible

All components are designed to be, at minimum, keyboard accesible.

PRs expanding on a11y are welcome.

### Zero configuration

Just install or load from a CDN and you're ready to go. F*ck bundlers and configuration files for a getting started experience.

### Easily themable

bUt hoW do You TheMe wiTHoUt CoNfIg and SCSS vArs?

Ever heard of css vars? they're cool and work at runtime unlike scss variables which only work at compile time.

Just create a class or property containig the variables you wanna change in a simple css theme file, why bloat the entire thing
with configuration files and weird ThemeProvider wrappers for something so CSS 101?

Take the built-in dark theme as an example.

B-but what about dynamic themes? Implement them yourself, this is not a framework, it's just a component library.

should be dead simple with the existence of the prefers-color-scheme css media query, at the end of the day that's what your fancy config wrappers use.

# FAQ

Why does this project exist? It all started after discovering **[Vuesax](https://vuesax.com/)**. A great looking but not so greatly mantained or functional component library.

Is the project manager ranting about modern web development being bloated? Yes.

Does this project support IE11 and older browsers? No and it does not aim to do it. Listen, if you want something pretty, functional and compatible with IE
you're just delusional and part of the problem. Btw using older browsers is a high security risk.

# LICENSE

This project is licensed under [MIT License](https://opensource.org/licenses/MIT)