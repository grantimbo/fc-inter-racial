import { createClient } from '@sanity/client';


export const client = createClient({
  projectId: '6mp6sm24',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01'
});
