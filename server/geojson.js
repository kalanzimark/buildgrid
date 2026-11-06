export function toFeature(doc) {
  const { geometry, ...properties } = doc;
  return { type: "Feature", properties, geometry };
}

export function toFeatureCollection(docs) {
  return {
    type: "FeatureCollection",
    features: docs.map(toFeature),
  };
}
