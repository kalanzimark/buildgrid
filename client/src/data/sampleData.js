// GeoJSON order is [longitude, latitude]

export const assets = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        type: "water_main",
        owner: "NWSC",
        depth_m: 1.2,
        installed: "2018-03-14",
        accuracy: "surveyed",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [32.575, 0.31],
          [32.58, 0.3136],
          [32.585, 0.317],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        type: "power_cable",
        owner: "UEDCL",
        depth_m: 0.8,
        installed: "2015-07-01",
        accuracy: "approximate",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [32.576, 0.317],
          [32.581, 0.314],
          [32.586, 0.3105],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        type: "fibre_duct",
        owner: "UTL",
        depth_m: 0.6,
        installed: "2021-11-20",
        accuracy: "approximate",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [32.578, 0.311],
          [32.5835, 0.3115],
          [32.588, 0.3125],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        type: "manhole",
        owner: "NWSC",
        depth_m: 2.0,
        installed: "2018-03-14",
        accuracy: "surveyed",
      },
      geometry: {
        type: "Point",
        coordinates: [32.5811, 0.3136],
      },
    },
  ],
};

export const digs = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        company_id: "demo-co-1",
        purpose: "Install fibre branch line",
        start: "2026-11-02",
        end: "2026-11-10",
        status: "pending",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [32.579, 0.315],
          [32.583, 0.312],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        company_id: "kcca",
        purpose: "Road resurfacing zone",
        start: "2026-11-05",
        end: "2026-11-20",
        status: "approved",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [32.5835, 0.3165],
            [32.5875, 0.3165],
            [32.5875, 0.3195],
            [32.5835, 0.3195],
            [32.5835, 0.3165], // same as the first: closes the ring
          ],
        ],
      },
    },
  ],
};
