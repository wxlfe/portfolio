const NEXT_PUBLIC_SANITY_PROJECT_ID = '';
const NEXT_PUBLIC_SANITY_DATASET = '';

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error(
    'Sanity project ID and dataset name are required. Go into `app/src/environments/environment.ts` and set them.'
  );
}

export const environment = {
  production: false,
  sanity: {
    projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2021-10-21',
    useCdn: true, // set to false for fresh data
  },
};
