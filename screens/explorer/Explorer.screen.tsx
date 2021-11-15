// const getLocation = async () => {
//   try {
//     const { status } = await requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       console.log('not granted');
//     }
//     const locations = await watchPositionAsync({ accuracy: Accuracy.High, timeInterval: 10000, distanceInterval: 1 }, (loc) => {
//       const { latitude, longitude } = loc.coords;
//       setLocation({ latitude: latitude, longitude: longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   callee();
// }, []);
// const callee = async () => {
//   await getLocation();
// };
