import { normalize, schema } from 'normalizr';

export default (items) => {
  const data = { allIds: items };
  const item = new schema.Entity('byId');
  const responseSchema = { allIds: new schema.Array(item) };
  const normalizedData = normalize(data, responseSchema);
  const { entities, result } = normalizedData;

  return { ...entities, ...result };
};
