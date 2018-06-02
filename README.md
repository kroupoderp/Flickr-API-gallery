# React Flickr gallery

An application I've built using React Create App that retrieves images from the Flickr API. The app relies on React, React Router v4 and Fetch in order to function.

Every time a user navigates to the root of the app (localhost:3000/), they are redirected to localhost:3000/cars. A component will be rendered that displays car images. The Fetch call to the Flickr API is made via the component's componentDidMount() method. A user can click on other navigation buttons, such as ships and airplanes, and once rendered a new Fetch call will be made, retrieving the relevant images. The navigation buttons are implemented using a NavLink component, so the page will never refresh and a user will be capable of navigating back and forth using using the browser history buttons. Also, clicking on the active navigation button will not perform anything, meaning the components can't update.

A search bar is also included. A user can type any term, and once submitted images will be retrieved relative to the term typed in. Since a user can perform two searches in a row, the SearchResults Component, which is rendered when a user performs a search, will get updated. The Fetch call will then be made via the component's componentDidUpdate() method. When performing a search the page also won't refresh and a user can navigate back forth using the the browser history buttons.

There are additional components: once that get's rendered when no images can be found relative to the search term typed in, and another that is rendered whenever a user navigates to a page that does not exist.  
