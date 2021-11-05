// import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

// export const getLocation = async (): Promise<[latitude: number, longitude: number]> => {
//   const { status } = await requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     console.log('not granted');
//     return [0, 0];
//   }
//   const location = await watchPositionAsync({ accuracy: Accuracy.High, timeInterval: 10000, distanceInterval: 1 }, (loc) => {
//     const { latitude, longitude } = loc.coords;
//     console.log(latitude, longitude);
//     return [latitude, longitude];
//   });
// };
