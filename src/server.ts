import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles, isValidUrl } from './util/util';
import { strict } from 'assert';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  const fetch = require('node-fetch');

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  // {{host}}/filteredimage?name=image_url={{URL}}
  app.get("/filteredimage/",  async (req:express.Request, res:express.Response) => {
    let { image_url } = req.query;

    if (!image_url) {
      return res.status(400).send(`image_url is required`);
    }

    if (!isValidUrl(image_url)) {
      return res.status(422).send(`image_url is not valid`);
    }


    // validate if the image exist


    let imagePath:string = await filterImageFromURL(image_url).then((imagePath:string) => {
      console.log("image file path " + imagePath);
      return imagePath;
    });

    res.status(200).sendFile(imagePath, function (err:Error) {
      if (err) {
        console.log("cannot send image");
      } else {
        let imagePaths: string[] = [];
        imagePaths.push(imagePath);
        deleteLocalFiles(imagePaths);
        console.log("deleting this image " + imagePath);
      }
    });
  }

  );

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/",  async (req:express.Request, res:express.Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });

  process.on('uncaughtException', function (err:Error) {
    console.log(err);
  });
  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();