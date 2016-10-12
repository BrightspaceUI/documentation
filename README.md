# Brightspace UI Documentation
[![Build status][ci-image]][ci-url]

Source files for generating the documentation for Brightspace UI at [https://d2qxiwojgs5u8k.cloudfront.net](https://d2qxiwojgs5u8k.cloudfront.net/).

## Installation & Setup

### Built using Jekyll

The site is built using [Jekyll](https://jekyllrb.com/), a web site generator which turns HTML, CSS,  [Markdown](https://daringfireball.net/projects/markdown/) and [Liquid](https://github.com/Shopify/liquid/wiki) templates into a static site. It's the same thing [GitHub Pages](https://pages.github.com/) uses, so you know it's cool.

To get started, follow [Jekyll's Quick-start guide](https://jekyllrb.com/docs/quickstart/). You'll need Ruby.  Note that on Windows you may also need to install Ruby devkit, Python & Pygments, and the Pygments.rb gem.

### Building and Serving

Once this repo is cloned and Jekyll is installed, use NPM to pull down a few more depdendencies:

```shell
# only need to run once
npm install
```

To build the web components used in the documentation:
```shell
# only need to run once, or when any new web components are added/changed
npm run build
```

Once the web components are built once, you can then use Jekyll's [build or serve commands](https://jekyllrb.com/docs/usage/).

Building:
```shell
jekyll build
```

Building, serving and watching for changes:
```shell
jekyll serve
```

Jekyll `serve` isn't super clever, so if you make any changes to the site configuration or plugins you'll need to run `jekyll build` again.

### Writing Documentation

Tips & tricks for contributing to the docs.

### Side Navigation

The hierarchy of the side navigation menu is defined as JSON in `/_data/menu.json`.

### Custom Code Blocks

The documentation uses several custom [Liquid Code Blocks](https://github.com/Shopify/liquid/wiki/Liquid-for-Programmers#create-your-own-tag-blocks) to make reusing things easier. They can be found in the `/_plugins` directory.

#### Code Example

This block allows you to show an inline code example. It takes 3 optional parameters:
- **type:** Type of code, defaults to "html". Can be any of the 98 languages the [Rouge code highlighter](http://rouge.jneen.net/) supports. Most common: "html", "javascript", "css", "shell".
- **demo:** Whether to render an inline demo. Defaults to `true` when the type is "html".
- **title:** Title of the example, defaults to "Example (<type>)".

```markdown
{% example type: "html", title: "Custom Title", demo: false %}
<button is="d2l-button">Button</button>
{% endexample %}
```

#### Note, Important and A11y

These three blocks let you create inline color-coded notes of various types. They each have an optional title.

Note (blue):
```markdown
{% note %}
A note about something interesting.
{% endnote %}
```

Important (red):
```markdown
{% important %}
Something really important goes in here.
{% endimportant %}
```

A11y:
```markdown
{% a11y Custom title %}
Accessibility tips go in here.
{% endnote %}
```

#### WCAG

Simple tag for displaying a WCAG badge with a link to a WCAG document. Takes 2 parameters:
- **level:** the WCAG level, one of "a", "aa" or "aaa". Defaults to "a".
- **url:** URL of the WCAG document

```markdown
{% wcag level: "aa", url: "http://w3c.org/somewhere" %}
Title of the document
{% endwcag %}
```

## Deploying

The site is deployed to Amazon S3 during the [Travis CI build step](https://travis-ci.org/BrightspaceUI/documentation/). A deployment will occur under two conditions:

### Pull Requests

When a pull request is created, the site containing the changes from the pull request will be deployed to:

> http://brightspace-ui-docs-dev.s3-website-us-east-1.amazonaws.com/pr/pull-request-number/

Any subsequent commits to that pull request will trigger a re-deploy, which overwrites the original. To allow for these further changes, browser caching of the assets is disabled.

### Tagged Commits

Tagged commits are used to signify a new production release of the documentation site. **Do not use tags for any other purpose.**

When a tagged commit occurs, the site will be deployed to:

> http://brightspace-ui-docs.s3-website-us-east-1.amazonaws.com/

Caching is configured to allow browsers to cache assets for 30 minutes, so you may need to empty your browser cache to see the latest changes.

CloudFront wraps the site and adds compression and further caching. It can be accessed at:

> https://d2qxiwojgs5u8k.cloudfront.net

**Note:** Because CloudFront adds its own caching layer, it will take up to 30 minutes for changes to appear.

[ci-url]: https://travis-ci.org/BrightspaceUI/documentation
[ci-image]: https://travis-ci.org/BrightspaceUI/documentation.svg?branch=master
