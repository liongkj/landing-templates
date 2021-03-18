[![Netlify Status](https://api.netlify.com/api/v1/badges/d143c579-924c-4e3e-9b87-2d7659c2d64b/deploy-status)](https://app.netlify.com/sites/landing-cta/deploys)
## ☁️ A simple one page landing site starter for video tutorial or lessons subscription collection.

Learning Project for gatsbyjs and serverless functions

### TODO

- [ ] Learn how to make multilingual

- [ ] Move stripe form handle to cloudflare workers? (netlify form 100 submission/month limit)

### Send invoice emails with Netlify Forms and Stripe subscription

[Form Handling with Gatsby.js V2 and Netlify](https://codebushi.com/form-handling-gatsby-netlify/)

[Stripe](https://stripe.com)

[Netlify Functions](https://www.netlify.com/products/functions/)

### Demo

[Live Demo: https://landing-cta.netlify.app/ ](https://landing-cta.netlify.app/)

Note: You will receive a live working stripe email. 

<img src="src/images/gatsby-starter-saas-marketing-full-page.png?raw=true" width="600" alt="Gatsby Starter Saas Marketing Full Screen Image"/>

### Styles

This starter uses [styled-components](https://www.styled-components.com/). The theme file contains the base styles `src/styles/theme.js` and the global styles file contains basic element styles and a style reset `src/styles/GlobalStyles.js`.

### Navigation

This starter uses [react-anchor-link-smooth-scroll](https://github.com/mauricevancooten/react-anchor-link-smooth-scroll#readme) and [react-scrollspy](https://github.com/makotot/react-scrollspy).
To link a navigation item to a section simply add an id and string value to a section parent element that corresponds to the same navigation string value in `navigation.js`
<br>
<br>
⚠️ Only the `Features` section is linked. Product and Pricing sections are intentionally not linked and will throw a `TypeError` in the console when clicked (because they do not exist in the starter). Please reach out if you want help extending this feature.

### Deploying to Netlify

[Deployment Guide](http://gatsbyjs.org/docs/deploying-to-netlify)

### Netlify form usage example

In `header.js` replacing the existing `<HeaderForm>...</HeaderForm>` components with the following should provide a working example once your site is deployed:

```
<HeaderForm
 name="early-access"
 method="post"
 data-netlify-honeypot="bot-field"
 data-netlify="true"
>
  <input type="hidden" name="bot-field" />
  <input type="hidden" name="form-name" value="early-access" />
  <HeaderInput
   type="email"
   placeholder="Your email"
   name="email"
   id="email"
   required
  />
  <HeaderButton>Early access</HeaderButton>
</HeaderForm>
```
