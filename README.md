
<!DOCTYPE html>
<html lang="en">

    <h1>BingeworthyFilms API</h1>
    <p>API of movie titles, cast, director information for use in databases</p>



    <h2>Endpoint listing</h2>
   <br />
      <h3>Get all movies</h3>
        <p class="url"><strong>Url: </strong>/movies</p>
      <p><strong>Method: </strong>GET</p>
      <p><strong>Description: </strong>Endpoint allows users to access the entire list of movies. Returns an array of objects, each containing movie data.</p>
      <p><strong>Query parameters: </strong>None</p>
      <p><strong>Expected request data format: </strong>Required: /movies</p>
        <h5>Example: </h5>
        <p>localhost:8080/movies</p>
      <p><strong>Expected format of response data: </strong>An array listing movies, each objecting containing data.</p>
        <h5>Example: </h5>
        <code class="code">
            {<br>
              Title: 'The Breakfast Club',<br>
              Description: 'Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.',<br>
              Genre: { Name: 'Coming of Age', Description: 'A coming-of-age story often focuses on the growth of a protagonist from childhood to adulthood. Coming-of-age stories tend to emphasize dialogue or internal monologue over action, and are often set in the past. The subjects of coming-of-age stories are typically teenagers.' },<br>
              Director: { Name: 'John Hughes', Bio: 'John Hughes was a writer/director with the uncanny ability to tap into the minds of angsty teens and tell their stories with compassion.'},<br>
              Actors: ['Molly Ringwald'],<br>
              ImagePath: url,<br>
              Featured: true<br>
            }
        </code>
          <p><strong>Response status codes: </strong></p>
          <p>200: okay - JSON array</p>
   <br />
      <h3>Get movies by title</h3>
        <p class="url"><strong>Url: </strong>/movies/:Title</p>
      <p><strong>Method: </strong>GET</p>
      <p><strong>Description: </strong>Endpoint allows users to access a particular movie as an object. Each object contains movie data.</p>
      <p><strong>Query parameters: </strong>:title</p>
      <p><strong>Expected request data format: </strong>Required: /movies/:title</p>
        <h5>Example: </h5>
        <p>localhost:8080/movies/The%20Breakfast%20Club</p>
      <p><strong>Format of response data: </strong>An object with data pertaining to a specific movie.</p>
        <h5>Example: </h5>
        <code class="code">
            {<br>
              Title: 'The Breakfast Club',<br>
              Description: 'Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.',<br>
              Genre: { Name: 'Coming of Age', Description: 'A coming-of-age story often focuses on the growth of a protagonist from childhood to adulthood. Coming-of-age stories tend to emphasize dialogue or internal monologue over action, and are often set in the past. The subjects of coming-of-age stories are typically teenagers.' },<br>
              Director: { Name: 'John Hughes', Bio: 'John Hughes was a writer/director with the uncanny ability to tap into the minds of angsty teens and tell their stories with compassion.'},<br>
              Actors: ['Molly Ringwald'],<br>
              ImagePath: url,<br>
              Featured: true<br>
            }
        </code>
        <p><strong>Response status codes: </strong></p>
          <p>200: okay - JSON object</p>
          <p>400: bad request - no such movie!!</p>
   <br />
      <h3>Get movie genres</h3>
        <p class="url"><strong>Url: </strong>/movies/genres/:Genre</p>
      <p><strong>Method: </strong>GET</p>
      <p><strong>Description: </strong>Endpoint allows users to access a particular genre as an object. Each object contains genre data.</p>
      <p><strong>Query parameters: </strong>:genreName</p>
      <p><strong>Expected request data format: </strong>Required: /genre/:genreName</p>
        <h5>Example: </h5>
        <p>localhost:8080/movies/genres/Coming-of-Age</p>
      <p><strong>Format of response data: </strong>An object with data pertaining to a specific genre.</p>
        <h5>Example: </h5>
        <code class="code">
          {<br>
            Genre: { Name: 'Coming of Age', Description: 'A coming-of-age story often focuses on the growth of a protagonist from childhood to adulthood. Coming-of-age stories tend to emphasize dialogue or internal monologue over action, and are often set in the past. The subjects of coming-of-age stories are typically teenagers.' },<br>
          }
        </code>
      <p><strong>Response status codes: </strong></p>
        <p>200: okay - JSON object</p>
        <p>400: bad request - no such genre</p>
   <br />
      <h3>Get movie directors</h3>
        <p class="url"><strong>Url: </strong>/movies/directors/:Director</p>
      <p><strong>Method: </strong>GET</p>
      <p><strong>Description: </strong>Endpoint allows users to access a particular director as an object. Each object contains director data.</p>
      <p><strong>Query parameters: </strong>:directorName</p>
      <p><strong>Expected request data format: </strong>Required: /directors/:Director</p>
        <h5>Example: </h5>
        <p>localhost:8080/movies/directors/John%20Hughes</p>
      <p><strong>Format of response data: </strong>An object with data pertaining to a specific director.</p>
        <h5>Example: </h5>
        <code class="code">
          {<br>
            Director: { Name: 'John Hughes', Bio: 'John Hughes was a writer/director with the uncanny ability to tap into the minds of angsty teens and tell their stories with compassion.'},<br>
          }
        </code>
      <p><strong>Response status codes: </strong></p>
        <p>200: okay - JSON object</p>
        <p>400: bad request - no such director</p>
   <br />
      <h3>Create new users</h3>
        <p class="url"><strong>Url: </strong>/users</p>
      <p><strong>Method: </strong>POST</p>
      <p><strong>Description: </strong>Allows registration of new users. Returns JSON object with values.</p>
      <p><strong>Query parameters: </strong>None</p>
      <p><strong>Expected request data format: </strong>Required: "UserName"</p>
        <h5>Example: </h5>
        <p>localhost:8080/users</p>
      <p><strong>Format of response data: </strong>JSON object with new user data including a name string, favoriteMovies array, and id string.</p>
        <h5>Example: </h5>
        <code class="code">
          {<br>
            {"_id": "632b7f49d30ead0fda88c1ad",
            "UserName": "AlisonB",
            "Password": "green",
            "Email": "alisonb@gmail.com",
            "Birthday": "1982-09-11T00:00:00.000Z",
            "FavoriteMovies": [
              "632b7680d30ead0fda88c1ac",
              "632b631ed30ead0fda88c1a5",
              "632b74c5d30ead0fda88c1ab"
            ]
            }
          }
        </code>
      <p><strong>Response status codes: </strong></p>
        <p>201: created - JSON object</p>
        <p>500: error: error</p>
   <br />
      <h3>Update users</h3>
        <p class="url"><strong>Url: </strong>/users/:UserName</p>
      <p><strong>Method: </strong>POST</p>
      <p><strong>Description: </strong>Allows updating of users. Returns JSON object with key values.</p>
      <p><strong>Query parameters: </strong>:id</p>
      <p><strong>Expected request data format: </strong>Required: :id</p>
        <h5>Example: </h5>
        <code class=code>
          {<br>
            {
            "_id": "6331d6ebae89c45753800871",
            "UserName": "Slimer",
            "Password": "1234",
            "Email": "slimer@gmail.com",
            "Birthday": "2011-01-01T06:00:00.000Z",
            "FavoriteMovies": [],
            }
          }
        </code>
      <p><strong>Format of response data: </strong>JSON object with updated user data including a name string, favoriteMovies array, and id string.</p>
        <h5>Example: </h5>
        <code class="code">
          {<br>
            {
            "_id": "6331d6ebae89c45753800871",
            "UserName": "Slimer",
            "Password": "1234",
            "Email": "slimer@gmail.com",
            "Birthday": "2011-01-01T06:00:00.000Z",
            "FavoriteMovies": [],
            }
          }
        </code>
      <p><strong>Response status codes: </strong></p>
        <p>200: ok - JSON object</p>
        <p>500: error: error</p>
   <br />
      <h3>Add favorite movie</h3>
        <p class="url"><strong>Url: </strong>/users/:UserName/movies/:movieID</p>
      <p><strong>Method: </strong>POST</p>
      <p><strong>Description: </strong>Allows users to add a favorite movie to an array.</p>
      <p><strong>Query parameters: </strong>:UserName, :movieID</p>
      <p><strong>Expected request data format: </strong>Required: :UserName, :movieID</p>
        <h5>Example: </h5>
        <p>localhost:8080/users/AlisonB/movies/632b74c5d30ead0fda88c1ab</p>
      <p><strong>Format of response data: </strong>JSON object with updated favoriteMovies array.</p>
        <h5>Example: </h5>
        <code class="code">
          {
            "_id": "632b7f49d30ead0fda88c1ad",
            "UserName": "AlisonB",
            "Password": "green",
            "Email": "alisonb@gmail.com",
            "Birthday": "1982-09-11T00:00:00.000Z",
            "FavoriteMovies": [
              "632b7680d30ead0fda88c1ac",
              "632b631ed30ead0fda88c1a5",
              "632b74c5d30ead0fda88c1ab"
            ]
          },
        </code>
      <p><strong>Response status codes: </strong></p>
        <p>500: error: error</p>
   <br />
      <h3>Remove favorite movie</h3>
        <p class="url"><strong>Url: </strong>/users/:UserName/movies/:MovieID</p>
      <p><strong>Method: </strong>DELETE</p>
      <p><strong>Description: </strong>Allows users to remove a favorite movie from an array.</p>
      <p><strong>Query parameters: </strong>:UserName, :MovieID</p>
      <p><strong>Expected request data format: </strong>Required: :UserName, :MovieID</p>
        <h5>Example: </h5>
        <p>localhost:8080/users/Slimer/movies/</p>
      <p><strong>Format of response data: </strong>JSON object with updated favoriteMovies array.</p>
        <h5>Example: </h5>
        <code class="code">
          "_id": "6331d6ebae89c45753800871",
          "UserName": "Slimer",
          "Password": "1234",
          "Email": "slimer@gmail.com",
          "Birthday": "2011-01-01T06:00:00.000Z",
          "FavoriteMovies": [],
        </code>
      <p><strong>Response status codes: </strong></p>
        <p>Array returned missing removed movie</p>
        <p>500: Error: error</p>
   <br /> 
      <h3>Remove user</h3>
        <p class="url"><strong>Url: </strong>/users/:UserName</p>
      <p><strong>Method: </strong>DELETE</p>
      <p><strong>Description: </strong>Allows users to remove a user from the API.</p>
      <p><strong>Query parameters: </strong>:id</p>
      <p><strong>Expected request data format: </strong>Required: :UserName</p>
        <h5>Example: </h5>
        <p>localhost:8080/users/Super_Slimer</p>
      <p><strong>Format of response data: </strong>Confirmation status of user removal.</p>
        <h5>Example: </h5>
        <code class="code">Super_Slimer was deleted.</code>
      <p><strong>Response status codes: </strong></p>
        <p>200: ok - UserName has been deleted</p>
        <p>500: Error: error</p>

