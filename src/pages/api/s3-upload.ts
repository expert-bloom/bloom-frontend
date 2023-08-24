/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { APIRoute, sanitizeKey, uuid } from 'next-s3-upload';

// export { APIRoute as default } from 'next-s3-upload';
const ROUTE = APIRoute.configure({
  key(req, filename) {
    console.log('req body -------> ', req.body);

    if (req.body?.filePath) {
      return `next-s3-uploads/${req.body?.filePath}/${
        sanitizeKey(filename) ?? ''
      }`;
    }
    return `next-s3-uploads/${sanitizeKey(filename)}`;
  },
});

export default ROUTE;
