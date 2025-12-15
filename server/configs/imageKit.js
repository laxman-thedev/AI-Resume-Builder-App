import ImageKit from '@imagekit/nodejs';

/*
|--------------------------------------------------------------------------
| ImageKit Configuration
|--------------------------------------------------------------------------
| Handles image uploads for resume profile photos
*/
const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default imageKit;