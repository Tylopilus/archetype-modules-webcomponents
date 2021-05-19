import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import copy from 'rollup-plugin-copy';

export const config: Config = {
  namespace: 'aem-shared-comps',
  outputTargets: [
    {
      type: 'dist',
      // esmLoaderPath: '../loader',
      empty: true,
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      baseUrl: 'http://localhost',
      buildDir: './clientlib-webcomps/resources/js',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass()],
  rollupPlugins: {
    after: [
      copy({
        targets: [
          { src: 'loader/loader.js', dest: 'www/clientlib-webcomps/js' },
        ],
      }),
    ],
  },
};
