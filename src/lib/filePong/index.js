/* eslint-disable */
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview';
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.css';
import 'filepond/dist/filepond.min.css';

import { create as dokaCreate } from './doka/doka.esm.min';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform,
  FilePondPluginImageResize,
  FilePondPluginImageEdit,
  FilePondPluginMediaPreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const create = (args) => {
  dokaCreate(args);
};

export { create };

export default FilePond;
export const Editor = create({
  cropAspectRatioOptions: [
    {
      label: 'Free',
      value: null,
    },
    {
      label: 'Portrait',
      value: 1.25,
    },
    {
      label: 'Square',
      value: 1,
    },
    {
      label: 'Landscape',
      value: 0.75,
    },
  ],
});
