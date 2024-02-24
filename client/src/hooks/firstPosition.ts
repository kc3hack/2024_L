export type SetFirstPositionParams = {
  latitude?: number;
  longitude?: number;
  defaultZoom?: number;
};

export const useFirstPosition = () => {
  // 正しい変数名を使用
  const getFirstPosition = () => {
    // localStorageから取得した値がnullならデフォルト値を使用
    const latitude = parseFloat(
      localStorage.getItem("latitude") ?? "34.841928"
    );
    const longitude = parseFloat(
      localStorage.getItem("longitude") ?? "135.705585"
    );
    const defaultZoom = parseInt(localStorage.getItem("defaultZoom") ?? "15");

    return { latitude, longitude, defaultZoom };
  };

  const setFirstPosition = ({
    latitude,
    longitude,
    defaultZoom,
  }: SetFirstPositionParams) => {
    if (latitude !== undefined) {
      localStorage.setItem("latitude", latitude.toString());
    }
    if (longitude !== undefined) {
      localStorage.setItem("longitude", longitude.toString());
    }
    if (defaultZoom !== undefined) {
      localStorage.setItem("defaultZoom", defaultZoom.toString());
    }
  };

  return { getFirstPosition, setFirstPosition };
};
